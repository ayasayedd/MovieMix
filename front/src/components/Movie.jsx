import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../css/Movie.css';

// Arrays of image paths (using public/assets)
const topImages = Array.from({ length: 14 }, (_, i) => `/assets/topimage/${i + 1}.png`);
const actionImages = Array.from({ length: 14 }, (_, i) => `/assets/img/img${i + 1}.png`);
const romanticImages = Array.from({ length: 14 }, (_, i) => `/assets/romanticimg/${i + 1}.png`);
const horrorImages = Array.from({ length: 14 }, (_, i) => `/assets/horror/${i + 1}.png`);

const Movie = () => {
  return (
    <div className="actionmovie">
      {/* Trending Movies Section */}
      <h2>Trending Movies</h2>
      <div className="trending">
        <div className="movie_list">
          <div className="contant">
            <Swiper
              slidesPerView={7}
              spaceBetween={30}
              loop={false}
              className="mySwiper"
            >
              {topImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="box">
                    <div className="img_box">
                      <img src={image} alt={`Trending Movie ${index + 1}`} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Action Movies Section */}
      <h2>Action Movies</h2>
      <div className="container">
        <div className="contant">
          {actionImages.map((image, index) => (
            <div key={index} className="box">
              <div className="img_box">
                <img src={image} alt={`Movie ${index + 1}`} />
                <div className="detail">
                  <div className="rate">
                    <div className="icon">
                      <span className="star">★</span>
                      <p>7.5</p>
                    </div>
                    <div className="icons">
                      <div className="play">▶</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Romantic Movies Section */}
      <h2>Romantic Movies</h2>
      <div className="container">
        <div className="contant">
          {romanticImages.map((image, index) => (
            <div key={index} className="box">
              <div className="img_box">
                <img src={image} alt={`Movie ${index + 1}`} />
                <div className="detail">
                  <div className="rate">
                    <div className="icon">
                      <span className="star">★</span>
                      <p>7.5</p>
                    </div>
                    <div className="icons">
                      <div className="play">▶</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horror Movies Section */}
      <h2>Horror Movies</h2>
      <div className="container">
        <div className="contant">
          {horrorImages.map((image, index) => (
            <div key={index} className="box">
              <div className="img_box">
                <img src={image} alt={`Movie ${index + 1}`} />
                <div className="detail">
                  <div className="rate">
                    <div className="icon">
                      <span className="star">★</span>
                      <p>7.5</p>
                    </div>
                    <div className="icons">
                      <div className="play">▶</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;