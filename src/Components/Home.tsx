import Bags from "./HomeComponents/Bags";
import BoysBrands from "./HomeComponents/BoysBrands";
import GirlsGrands from "./HomeComponents/GirlsGrands";
import Luggages from "./HomeComponents/Luggages";
import MensWear from "./HomeComponents/MensWear";
import Suitcases from "./HomeComponents/Suitcases";
import WomensWear from "./HomeComponents/WomensWear";

const Home = () => {


    return (
        <>
            <section className="relative w-full h-screen overflow-hidden">
                <video
                    className="fashion-video absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="https://res.cloudinary.com/de9nsk1zx/video/upload/v1761584191/Fashionvideo_jxhrmk.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>


                {/* 🔥 Black Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

                {/* Overlay Content */}
                <div className="relative z-20 text-white text-center pt-32">
                    <h1 className="text-4xl font-bold">Welcome to Fashion World</h1>
                    <p className="text-lg">Explore the latest trends</p>
                </div>
            </section>


            {/* Content Below Video */}
            <section className="flex justify-center items-center">
                <div className="offer-strip">
                    <h2>7 Days Easy Return</h2>
                    <h2>Cash On Delivery</h2>
                    <h2>Lowest Prices</h2>
                    <h2>Best Quality</h2>
                </div>
            </section>

            {/* Mens */}

            <MensWear />

            {/* Womens */}

            <WomensWear />

            {/* Offers carousel */}

            <section>

            </section>

            {/* Kids */}
            <section className="mt-16">
                <div className="flex justify-center">
                    <BoysBrands />
                    <GirlsGrands />
                </div>
            </section>

            {/* carousel W & A*/}

            <section>

            </section>


            {/* Bags... */}

            <section className="mt-16">
                <div className="flex justify-center">
                    <div className="bags-suitcases-luggage">

                        <Bags />

                    </div>
                    <div className="bags-suitcases-luggage">

                        <Suitcases />

                    </div>
                    <div className="bags-suitcases-luggage">

                        <Luggages />
                    </div>
                </div>
            </section>


        </>
    );
};

export default Home;
