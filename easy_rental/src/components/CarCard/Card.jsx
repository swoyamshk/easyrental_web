import React from 'react';

const Card = ({ imgSrc, imgAlt, title, description, price, onClick }) => (
  <div onClick={onClick}  className="bg-background rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    <img
      src={imgSrc}
      alt={imgAlt}
      width="400"
      height="300"
      style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
    />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{price}</span>
       
      </div>
    </div>
  </div>
);

export default Card;
