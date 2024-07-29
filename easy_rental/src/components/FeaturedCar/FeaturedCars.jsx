import Card from '../CarCard/Card'
import teslaImage from "../assets/img/tesla.png";
import bmw from "../assets/img/bmw.png";
import mercedes from "../assets/img/mercedes.png";

const FeaturedCars = () => (
    <section className="py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Cars</h2>
          <a className="text-primary hover:underline" href="#">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            imgSrc={teslaImage}
            imgAlt="Car 1"
            title="Toyota Camry"
            description="Midsize sedan, seats 5"
            price="$50/day"
          />
          <Card
            imgSrc={bmw}
            imgAlt="Car 2"
            title="Honda Civic"
            description="Compact sedan, seats 5"
            price="$40/day"
          />
          <Card
            imgSrc={mercedes}
            imgAlt="Car 3"
            title="Ford Mustang"
            description="Sports car, seats 4"
            price="$80/day"
          />
        </div>
      </div>
    </section>
  );
export default FeaturedCars;  