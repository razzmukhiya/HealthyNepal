import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DashboardCard = ({ title, value, icon, link, index }) => (
  <Draggable draggableId={title} index={index}>
    {(provided) => (
      <Link
        to={link}
        className="dashboard-card"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="card-icon">{icon}</div>
        <div className="card-content">
          <h3>{title}</h3>
          <p className="card-value">{value}</p>
        </div>
      </Link>
    )}
  </Draggable>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth || {});
  const orders = useSelector((state) => state?.order?.orders || []);
  const wishlist = useSelector((state) => state?.wishlist?.wishlist || []);
  const addresses = useSelector((state) => state?.address?.addresses || []);

  const orderCount = orders.length;
  const wishlistCount = wishlist.length;
  const addressCount = addresses.length;

  const onDragEnd = (result) => {
    // Handle the drag end event
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dashboard">
        {(provided) => (
          <div
            className="dashboard-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="welcome-section">
              <h2>Welcome back, {user?.name}!</h2>
              <p>Manage your orders, addresses, and profile settings here.</p>
            </div>

            <div className="dashboard-stats">
              <DashboardCard title="Total Orders" value={orderCount} icon="📦" link="/dashboard/orders" index={0} />
              <DashboardCard title="Wishlist Items" value={wishlistCount} icon="❤️" link="/dashboard/wishlist" index={1} />
              <DashboardCard title="Saved Addresses" value={addressCount} icon="📍" link="/dashboard/address" index={2} />
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {orderCount === 0 ? (
                  <div className="empty-state">
                    <p>No recent orders found</p>
                    <Link to="/products" className="shop-now-btn">Start Shopping</Link>
                  </div>
                ) : (
                  <p>Loading recent orders...</p>
                )}
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <Link to="/dashboard/profile" className="action-btn">Update Profile</Link>
                <Link to="/dashboard/address" className="action-btn">Add New Address</Link>
                <Link to="/dashboard/chatsupport" className="action-btn">Contact Support</Link>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
