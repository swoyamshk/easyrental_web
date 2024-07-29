
const Card = ({ imgSrc, imgAlt, title, description, price }) => (
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
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{price}</span>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
export default Card;  