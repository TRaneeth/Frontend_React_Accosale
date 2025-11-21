import React from 'react';

const AccountCard = ({ item }) => {
  // item fields: image, type, username, category (array), selectedCategory, price, link, info
  const avatar = item.image ? item.image : '/mnt/data/carddddd.jpg';

  return (
    <div className="acco-card">
      <div className="acco-top">
        <div className="acco-avatar">
          <img src={avatar} alt={item.username || 'avatar'} />
        </div>

        <div className="acco-meta">
          <div className="acco-type">{item.type || item.selectedCategory || 'Platform'}</div>
          <div className="acco-name">{item.username || item.id || '@username'}</div>

          {/* simple metric as you asked: category[0] : selectedCategory */}
          {item.category && item.category.length > 0 && item.selectedCategory && (
            <div className="acco-metric">
              {item.category[0]} : {item.selectedCategory}
            </div>
          )}

          <div className="acco-price">Rs.{item.price ?? '—'}</div>
        </div>
      </div>

      <div className="acco-body">
        <div className="acco-field"><light>link:</light> <span className="link-text">{item.link || '—'}</span></div>

        <div className="acco-about">
          <p>{item.info || 'No description provided.'}</p>
        </div>
      </div>

      <div className="acco-footer">
        <button className="btn btn-primary">chat</button>
        <button className="btn btn-primary btn-outline">wishlist</button>
      </div>
    </div>
  );
};

export default AccountCard;
