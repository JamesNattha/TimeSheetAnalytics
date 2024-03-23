import React, { useEffect, useState } from 'react';
import api from '_api';

const InfoMonday = ({ boardId }) => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [fetchtUser, setFetchtUser] = useState([]);
  const [selectUser, setSelectUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, isStatus } = await api.monday.fetchDataAll();
        console.log('Response Data:', data.data.boards);
        if (isStatus) setData(data.data.boards);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set isLoading to false in case of error
      }
    };

    const fetchMondayUser = async () => {
      try {
        const { data, isStatus } = await api.monday.fetchMondayUser();
        if (isStatus) setUserId(data.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUser = async () => {
      try {
        const { data, isStatus } = await api.monday.fetchUser();
        if (isStatus) setFetchtUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchMondayUser();
    fetchUser();
  }, []);

  useEffect(() => {
    const foundUser = userId.find((user) => fetchtUser.some((fetchUser) => fetchUser.username === user.email));
    if (foundUser) {
      setSelectUser(foundUser.id);
    }
  }, [userId, fetchtUser]);

  const subitemsData = data.filter((board) => board.name.startsWith('Subitems of'));

  const filteredSubitems = subitemsData.filter((subitem) => {
    const personColumn = subitem.items.find((item) => {
      return (
        item.column_values &&
        item.column_values.some((columnValue) => {
          if (columnValue.id === 'person' && columnValue.value) {
            const parsedValue = JSON.parse(columnValue.value);
            return parsedValue.personsAndTeams.some((person) => person.id === selectUser);
          }
          return false;
        })
      );
    });
    return personColumn !== undefined;
  });

  console.log('data 1', filteredSubitems);
  console.log('data 2', subitemsData);
  console.log('data 3', selectUser);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Subitems Name</th>
            {selectUser && <th>Owner</th>}
            {selectUser && <th>Email</th>}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubitems.map((board) =>
            board.items.map((item) => {
              const personColumn = item.column_values.find((columnValue) => columnValue.id === 'person');
              if (personColumn && personColumn.value && personColumn.value !== '') {
                const parsedValue = JSON.parse(personColumn.value);
                const ids = parsedValue.personsAndTeams.map((person) => person.id);
                if (ids.includes(selectUser)) {
                  return (
                    <tr key={item.id}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{board.name.replace('Subitems of', '')}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {userId
                          .filter((user) => ids.includes(user.id))
                          .map((user) => (
                            <span key={user.id}>
                              {user.name}
                              <br />
                            </span>
                          ))}
                      </td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {userId
                          .filter((user) => ids.includes(user.id))
                          .map((user) => (
                            <span key={user.id}>
                              {user.email}
                              <br />
                            </span>
                          ))}
                      </td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {item.column_values &&
                          item.column_values.map((columnValue) => {
                            if (columnValue.id === 'status') {
                              return <span key={columnValue.id}>{columnValue.text}</span>;
                            }
                            return null;
                          })}
                      </td>
                    </tr>
                  );
                }
              }
              return null;
            })
          )}
          {/* Render a row with 'No items' message if there are no matching items */}
          {filteredSubitems.length === 0 && (
            <tr>
              <td colSpan={selectUser ? 5 : 4}>No items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InfoMonday;
