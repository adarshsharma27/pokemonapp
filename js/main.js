const appId = '8c3b2f79';
const appKey = "833a3e6890a788bc921be8ddef44ffdb";

$(document).ready(function () {
  $('#generate').click(function (event) {
    //  $('#food-cards').html('');

    event.preventDefault();
    let id = Math.floor(Math.random() * 500) + 1
    finalUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
    $.ajax({
      url: finalUrl,
      method: 'GET',
      success: function (data) {
        // $.each(data, function (key, data) {
        console.log(data)
        let html = ` <div class="col-xl-3 col-md-3 col-sm-12 mx-auto">
                <div class="product-card text-left">
                    <img class="img-responsive" src=${data.sprites.other.dream_world.front_default}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                            <h3>${data.name}</h3>
                            <p class="decription-1">Weight:${data.weight}</p>
                            <p class="decription-2">Height:${data.height}</p>
                            <p class="decription-3">Moves:${data.moves[0].move.name}</p> 
                        </div>
                    </div>
                </div>
            </div>`
        $('#food-cards').append(html);

        // });
      },
      error: function (error) {
        console.log(error);
      }

    });

  });
});

$('.fa-search').click(function (event) {
  $('#food-cards').html('');
  event.preventDefault();
  pokemonName = $("#search").val();
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    method: 'GET',
    success: function (data) {

      let html = ` <div class="col-xl-3 col-md-3 col-sm-12 mx-auto">
                <div class="product-card text-left">
                    <img class="img-responsive" src=${data.sprites.other.dream_world.front_default}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                            <h3>${data.name}</h3>
                            <p class="decription-1">Weight:${data.weight}</p>
                            <p class="decription-2">Height:${data.height}</p>
                            <p class="decription-3">Moves:${data.moves[0].move.name}</p> 
                        </div>
                    </div>
                </div>
            </div>`
      $('#food-cards').append(html);

    },
    error: function (error) {
      console.log(error);
    }

  });
});



$(document).on("click", ".img-responsive", function (event) {
  let image = $(this).attr('src')
  let heading = $(this).siblings('.product-image-caption').children('.product-image-txt').children('h3').text().trim();
  let p1 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-1').text().trim();
  let p2 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-2').text().trim();
  let p3 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-3').text().trim();
  let btnUrl = $(this).siblings('.product-image-caption').children('.product-image-txt').children('a').attr('href');
  window.location.href = "details.html";

  let foodDetails = {
    imageUrl: image,
    name: heading,
    par: p1,
    par2: p2,
    par3: p3,
    cta: btnUrl
  }
  console.log(foodDetails)

  localStorage.setItem("FoodData", JSON.stringify(foodDetails));
});

let foodData = JSON.parse(localStorage.getItem("FoodData"))
$('.row').html('')
$("#details").html(`
  <div class="col-md-6 order-md-1 order-2 text-md-left text-center py-4 ">
      <h4  class="font-weight-light animation"><b>${foodData.name}</b></h4>
        <div  class="description py- animation  overflow-hidden">
        <p> ${foodData.par} </p>
          <p> ${foodData.par2} </p>
          <p> ${foodData.par3} </p>
      </div>
      <a href="index.html"  class="btn btn-primary  my-3  animation" data-fancybox="gallery">Read More</a>
        </div>
  <div  class="col-md-6 order-md-2 order-1 text-center p-0 h-100 w-100 ">
    <img  src=${foodData.imageUrl}  class="img-fluid">
  </div>
`

)