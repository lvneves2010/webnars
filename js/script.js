$ = jQuery;
var json = $.getJSON("./js/eventos.json", function (results) {
  $.each(results, function () {
    var div = `<div class="ibm-grid-col-xlg-16-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 ibm-padding-bottom-1" keyword="${this.keyword}">
                      <div class="ibm-background-neutral-white-35"><img src="${this.image}" class="ibm-resize" alt="${this.alt}">
                       <div class="ibm-padding-content">
                       <p class="ibm-type-d">${this.data}</p>
                      <div class="event__content">
                      <h1 class="ibm-type-e">${this.title}</h1>
                      <p class="ibm-type-b">${this.description}</p>
                      </div>
                      <p class="ibm-ind-link ibm-padding-top-3 ibm-padding-bottom-1"><a
                          class="bx--link" href="${this.url}" target='_blank'>${this.cta}</a></p></div>
                    </div></div>`;
    $("#card__container-webinar").append(div);
  });
});
var json = $.getJSON("./js/ondemand.json", function (results) {
  $.each(results, function () {
    var div = `<div class="ibm-grid-col-xlg-16-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 ibm-padding-bottom-1" keyword="${this.keyword}">
                      <div class="ibm-background-gray-35"><img src="${
      this.image
      }" class="ibm-resize" alt="${this.alt}">
                      <div class="ibm-padding-content">
                      <div class="ondemand__content">
                      <h1 class="ibm-type-e">${this.title}</h1>
                      <div class="ibm-type-b ibm-bold" >${
      this.subtitle || ""
      }</div>
                      <p class="ibm-type-b">${this.description}</p>
                      </div>
                      <p class="ibm-ind-link ibm-padding-top-3 ibm-padding-bottom-1"><a
                          class="ibx--link" href="${
      this.url
      }" target='_blank'>${this.cta ? this.cta : 'Revívelo'} </a></p>
                          
                          </div>
                    </div></div>`;
    $("#card__container-ondemand").append(div);
  });
});

function mySearch() {
  var input, filter, i, txtValue, card, container, p0, p1;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  container = document.getElementById("cards");
  console.log("check", container)
  card = container.getElementsByClassName("ibm-padding-top-1");

for (i = 0; i < card.length; i++) {
    p0 = card[i].getElementsByTagName("p")[0];
    p1 = card[i].getElementsByTagName("p")[1];
    h1 = card[i].getElementsByTagName("h1")[0];
    txtValue = p0.textContent + p0.innerText + p1.textContent + p1.innerText + h1.textContent + h1.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

function resetFilter() {
  document.getElementById('checkbox-cloud').checked = false;
  document.getElementById('checkbox-ia').checked = false;
  document.getElementById('checkbox-seguridad').checked = false;
  document.getElementById('checkbox-infraestructura').checked = false;
  document.getElementById('checkbox-data').checked = false;
  document.getElementById('checkbox-consultoria').checked = false;
  document.getElementById('checkbox-servicios').checked = false;
  check()
}

function check()
{

  var keywords = [];
  if (document.getElementById('checkbox-cloud').checked) 
  {
    keywords.push("cloud")
  }
  if (document.getElementById('checkbox-ia').checked) 
  {
    keywords.push("ia")
  }
  if (document.getElementById('checkbox-seguridad').checked) 
  {
    keywords.push("seguridad")
  }
  if (document.getElementById('checkbox-infraestructura').checked) 
  {
    keywords.push("infraestructura")
  }
  if (document.getElementById('checkbox-data').checked) 
  {
    keywords.push("data")
  }
  if (document.getElementById('checkbox-consultoria').checked) 
  {
    keywords.push("consultoria")
  }
  if (document.getElementById('checkbox-servicios').checked) 
  {
    keywords.push("servicios")
  }

  filterSearch(keywords)
  console.log("keywords", keywords)
}

function filterSearch(keys) {
  var i, card, container;
  container = document.getElementById("cards");
  console.log("keys", keys)
  card = container.getElementsByClassName("ibm-padding-top-1");


  if(keys.length == 0) {
  for (i = 0; i < card.length; i++) {
        card[i].style.display = "";
    }
  } else {
    for (i = 0; i < card.length; i++) {
          card[i].style.display = "none";
      }
    keys.map((key) => {
      for (i = 0; i < card.length; i++) {
        k = card[i].getAttribute("keyword");
        console.log("k>>", k)
        if( k == key) {
          card[i].style.display = "";
        }
      }
    })
  }
}

function setSameHeight(el) {
  var arr = [];
  setTimeout(function () {
    var card = document.getElementsByClassName(el);
    for (let x = 0; x < card.length; x++) {
      arr.push(card[x].offsetHeight);
      arr.sort();
    }
    for (let x = 0; x < card.length; x++) {
      card[x].style.height = `${arr[arr.length - 1]}px`;
    }
  }, 100);
}

// function changeTab(top, bottom, show2, show1) {
//   document.getElementById(top).classList.add("flex__item-active");
//   document.getElementById(bottom).classList.add("flex__item-active");
//   document.getElementById(show2).classList.remove("ibm-hide");
//   document.getElementById(show1).classList.remove("ibm-hide");
// }
// let closed = true;
// function openTab(show) {
//   if (closed) {
//     document.getElementById(show).classList.remove("ibm-hide");
//     closed = false;
//   } else {
//     document.getElementById(show).classList.add("ibm-hide");
//     closed = true;
//   }
// }

$(window).on("load", function () {
  setSameHeight("event__content");
  setSameHeight("ondemand__content");
});
