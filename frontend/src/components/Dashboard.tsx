import React, { useState } from 'react';
import TodoApp from './TodoApp';
import Patients from './Patients';
import Users from './Users';
import './Dashboard.css';

const Dashboard:React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tasks");
  const categories = ["Tasks", "Users", "Patients"];

  const renderContent = () => {
    switch (selectedCategory) {
      case "Tasks":
        return <TodoApp />;
      case "Users":
        return <Users />;
      case "Patients":
        return <Patients />;
      default:
        return <TodoApp />;
    }
  };

  return (
    <div className="dashboard" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="categories-header"></div>
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content" style={{ flex: 1, overflow: 'hidden' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;