import React, { useEffect, useState } from 'react';
import api from '_api';

const InfoMonday = ({ boardId }) => {
  const [clientTasks, setClientTasks] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    if (boardId) {
      fetchMonday(boardId);
    }
    fetchMondayUser();
  }, [boardId]);

  const fetchMonday = async (boardId) => {
    try {
      const { data, isStatus } = await api.monday.fetchMonday(boardId);
      if (isStatus) setClientTasks(data.data.boards);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMondayUser = async (boardId) => {
    try {
      const { data, isStatus } = await api.monday.fetchMondayUser();
      if (isStatus) setUserId(data.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Client Tasks</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th
              style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}
              colSpan={(clientTasks[0]?.items.length + 1).toString()}
            >
              Board Name: {clientTasks[0]?.name}
            </th>
          </tr>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Work Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Users Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Users Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Work Status</th>
          </tr>
        </thead>
        <tbody>
          {clientTasks.map((board, index) => (
            <React.Fragment key={index}>
              {board.items.map((item, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                  {subIndex === 0 && index > 0 && (
                    <td style={{ border: '1px solid black', padding: '8px' }} rowSpan={board.items.length}>
                      Board Name: {board.name}
                    </td>
                  )}
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.column_values &&
                      item.column_values.map((columnValue, three) => {
                        if (columnValue.id === 'person') {
                          if (columnValue.value && columnValue.value !== '') {
                            const parsedValue = JSON.parse(columnValue.value);
                            const ids = parsedValue.personsAndTeams.map((item) => item.id);
                            if (ids.every((id) => userId.map((item) => item.id).includes(id))) {
                              return userId
                                .filter((user) => ids.includes(user.id))
                                .map((user) => (
                                  <span key={user.id}>
                                    {user.name}
                                    <br />
                                  </span>
                                ));
                            }
                          }
                        }
                        return null;
                      })}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.column_values &&
                      item.column_values.map((columnValue, three) => {
                        if (columnValue.id === 'person') {
                          if (columnValue.value && columnValue.value !== '') {
                            const parsedValue = JSON.parse(columnValue.value);
                            const ids = parsedValue.personsAndTeams.map((item) => item.id);
                            if (ids.every((id) => userId.map((item) => item.id).includes(id))) {
                              return userId
                                .filter((user) => ids.includes(user.id))
                                .map((user) => (
                                  <span key={user.id}>
                                    {user.email}
                                    <br />
                                  </span>
                                ));
                            }
                          }
                        }
                        return null;
                      })}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {item.column_values &&
                      item.column_values.map((columnValue, index) => {
                        if (columnValue.id === 'status') {
                          return <span key={index}>{columnValue.text}</span>;
                        }
                        return null;
                      })}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoMonday;
