import React, { useEffect, useState } from 'react';
import api from '_api';
import InfoMonday from './Info_Monday';

const Monday = () => {
  const [boardId, setBoardId] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    const getBoardId = async () => {
      try {
        const { data, isStatus } = await api.monday.getBoardId();
        console.log('Response Data:', data.data.boards);
        if (isStatus) setBoardId(data.data.boards);
      } catch (error) {
        console.error(error);
      }
    };

    getBoardId();
  }, []);

  const handleBoardSelection = (selectedBoardId) => {
    setSelectedBoardId(selectedBoardId);
  };

  const handleGroupToggle = (groupName) => {
    setExpandedGroup(groupName === expandedGroup ? null : groupName);
  };

  console.log('WORK DO YOU MEAN', selectedBoardId);

  const groupedBoards = {};
  boardId.forEach((board) => {
    let groupName = board.name;
    if (groupName.startsWith('Subitems of')) {
      groupName = groupName.substr(12);
    }
    if (groupedBoards[groupName]) {
      groupedBoards[groupName].push(board);
    } else {
      groupedBoards[groupName] = [board];
    }
  });

  return (
    <div>
      <h1>Client Tasks</h1>
      <h3>Select a group:</h3>
      {Object.keys(groupedBoards).map((groupName) => (
        <div key={groupName}>
          <button
            type="button"
            onClick={() => handleGroupToggle(groupName)}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            {groupName}
          </button>
          {expandedGroup === groupName && (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Board ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                </tr>
              </thead>
              <tbody>
                {groupedBoards[groupName].map((board) => (
                  <tr
                    key={board.id}
                    onClick={() => handleBoardSelection(board.id)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleBoardSelection(board.id);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                  >
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{board.id}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{board.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <hr />
        </div>
      ))}
      {selectedBoardId && <InfoMonday boardId={selectedBoardId} />}
    </div>
  );
};

export default Monday;
