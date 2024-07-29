

const CategoryCard = ({ imgSrc, imgAlt, title, description }) => (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
      <img
        src={imgSrc}
        alt={imgAlt}
        width="400"
        height="300"
        style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Explore
        </button>
      </div>
    </div>
  );

  export default CategoryCard;