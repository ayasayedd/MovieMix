import React  , { useRef  , useState} from 'react'
import '../css/slider.css'
function SliderItem({ movieTitle , movieDescription , movieImage }) {
    return (
        <div className="item" style={{backgroundImage: `url(${movieImage})`}}>
        <div className="content">
            <div className="name">{movieTitle}</div>
            <div className="title">{movieDescription}
            </div>
            <div className="buttons">
            <button><i className="fa-solid fa-play" /></button>
            <button><i className="fa-regular fa-heart"></i></button>
            </div>
        </div>
        </div>
    )
    
}

const Slider = () => {
        const slideRef = useRef();
        const [touchStartX, setTouchStartX] = useState(0);
        const [touchEndX, setTouchEndX] = useState(0);
        function goToNext() {
            let items = slideRef.current.querySelectorAll(".item");
            slideRef.current.appendChild(items[0]);
            }
        function goToPrevious() {
            let items =  slideRef.current.querySelectorAll(".item");
            slideRef.current.prepend(items[items.length - 1]);
            }
            function handleTouchStart(e) {
                setTouchStartX(e.touches[0].clientX);
            }
            
            function handleTouchEnd(e) {
                setTouchEndX(e.changedTouches[0].clientX);
                handleSwipe();
            }
            
            function handleSwipe() {
                const threshold = 50;   
                if (touchStartX - touchEndX > threshold) {
                    goToNext();
                } else if (touchEndX - touchStartX > threshold) {
                    goToPrevious(); 
                }
            }
return (
<>
<div className="container">
<div className="slide"  ref={slideRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
<SliderItem movieTitle="Teenage Mutant Ninja Turtles 2" movieDescription="Aided by April and newcomer Casey, the Ninja Turtles fly into action after Shredder escapes prison and plots to take over the world with evil Krang." movieImage="https://occ-0-6661-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABek9odZ0j_pcQEwocQt9qCLW5oF6Rlpici9o_2_RGDzw1mR30SXtaCOHoefizm0budNSAgXHrR4EZFf91HdplTWqCbKGeEkfBJHJ.jpg?r=aea" />
<SliderItem movieTitle="Fast &amp; Furious Presents: Hobbs &amp; Shaw" movieDescription="Aided by April and newcomer Casey, the Ninja Turtles fly into action after Shredder escapes prison and plots to take over the world with evil Krang." movieImage="https://occ-0-6661-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYDDCo2vQHmh50QNN23P0tHbYQK8fmh8IxIuUQ-TfY7tThr29qPEBLOuI6GARs8a7XL_UzvTswXYM0fhnaoNge5W8F0Sb7-s4i3Q.jpg?r=64c" />
<SliderItem movieTitle="Morbius" movieDescription="A biochemist with a rare blood disease in search of a cure injects himself with a dangerous serum that gives him super strength and a thirst for blood." movieImage="https://occ-0-6661-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVdQO8JweMJwZhMU0XkARlmaDYz0NZAa0saKZrrcbVQxIV9CHKdOnDnkjy9OzZSVE2mlCoQe6LPXdk1bNi-hb1-oshCixQ3Kho_x.jpg?r=c11" />
<SliderItem movieTitle="GODZILLA VS. KONG" movieDescription="An ancient rivalry pits two legends against each other while a mission into uncharted terrain unearths clues to the Titans' very origins." movieImage="/images/4.png" />
<SliderItem movieTitle="VENOM" movieDescription="A reporter battles a mad scientist in a fight for his life after merging with a snarky alien symbiote that gives him remarkable superpowers." movieImage="https://occ-0-6661-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVEehT_svjFXWkqnOFZtmy1QyhBne8ofF92HmD3v4ir9vfwkSGzxkHF6NR7erP1MQB6r-LiQPEKKRpWrJrxfl1UnTA-uCKIOlcee.jpg?r=de2" />
<SliderItem movieTitle="Spider-Man 3" movieDescription="In China, Dre learns to defend himself against a bully under the guidance of an unassuming kung fu master in this remake of the 1984 classic." movieImage="https://occ-0-6661-55.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcdvwwJ7fxbt_ihh658bBKE6CMsXC4sGXmeYkqcWS_YcnvvsxQtH7JTlGS7phhshsTgZTAxH25FGmnupEOliQ2hwHxUxxhJohF59.jpg?r=73c" />
</div>
<div className="sliderBTN" >
    <button className="prev" onClick={goToPrevious}>
    <i className="fa-solid fa-angle-left sliderBTNButtonI"  />
    </button>
    <button className="next" onClick={goToNext}>
    <i className="fa-solid fa-angle-right sliderBTNButtonI" />
    </button>
</div>
</div>
</>
)
}

export default Slider
