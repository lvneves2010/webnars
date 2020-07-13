$ = jQuery;
var json = $.getJSON("./js/eventos.json", function (results) {
  $.each(results, function () {
    var div = `<div class="ibm-grid-col-xlg-16-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 ibm-padding-bottom-1">
                      <div class="ibm-background-white-core"><img src="${this.image}" class="ibm-resize" alt="${this.alt}">
                       <div class="ibm-padding-content">
                       <p class="ibm-type-d">${this.data}</p>
                      <div class="event__content">
                      <h1 class="ibm-type-e">${this.title}</h1>
                      <p class="ibm-type-b">${this.description}</p>
                      </div>
                      <p class="ibm-ind-link ibm-padding-top-3 ibm-padding-bottom-1"><a
                          class="ibm-btn-pri ${this.icon}" href="${this.url}" target='_blank'>${this.cta}</a></p></div>
                    </div></div>`;
    $("#card__container-webinar").append(div);
  });
});
var json = $.getJSON("./js/ondemand.json", function (results) {
  $.each(results, function () {
    var div = `<div class="ibm-grid-col-xlg-16-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 ibm-padding-bottom-1">
                      <div class="ibm-background-white-core"><img src="${
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
                          class="ibm-btn-pri ${this.icon}" href="${
      this.url
      }" target='_blank'>${this.cta ? this.cta : 'Revívelo'} </a></p>
                          
                          </div>
                    </div></div>`;
    $("#card__container-ondemand").append(div);
  });
});

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

function changeTab(on, off, hide, show) {
  document.getElementById(on).classList.add("flex__item-active");
  document.getElementById(off).classList.remove("flex__item-active");
  document.getElementById(hide).classList.add("ibm-hide");
  document.getElementById(show).classList.remove("ibm-hide");
}
let closed = true;
function openTab(show) {
  if (closed) {
    document.getElementById(show).classList.remove("ibm-hide");
    closed = false;
  } else {
    document.getElementById(show).classList.add("ibm-hide");
    closed = true;
  }
}

$(window).on("load", function () {
  setSameHeight("event__content");
});
