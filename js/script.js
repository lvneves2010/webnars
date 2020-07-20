$ = jQuery;
var cloudqty = 0;
var iaqty = 0;
var seguridadqty = 0;
var infraestructuraqty = 0;
var dataqty = 0;
var consultoriaqty = 0;
var serviciosqty = 0;
var cardArr = [];
var filteredCards = [];
var cardIndex = 0;
var json = $.getJSON("./js/eventos.json", function (results) {
  $.each(results, function () {
    cardIndex ++;
    var div = `<div class="ibm-grid-col-xlg-12-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 card-frame ibm-padding-bottom-1" keyword="${this.keyword}" id="card${cardIndex}">
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
    cardArr.push(div);
    k = this.keyword
    if(k == "cloud") {
      cloudqty += 1
    } else if (k == "ia") {
      iaqty += 1
    } else if (k == "seguridad") {
      seguridadqty += 1
    } else if (k == "infraestructura") {
      infraestructuraqty += 1
    } else if (k == "data") {
      dataqty += 1
    } else if (k == "consultoria") {
      consultoriaqty += 1
    } else if (k == "servicios") {
      serviciosqty += 1
    }

  });
});
var json = $.getJSON("./js/ondemand.json", function (results) {
  $.each(results, function () {
    cardIndex ++;
    var div = `<div class="ibm-grid-col-xlg-12-4 ibm-grid-col-lg-16-8 ibm-grid-col-md-8-4 ibm-grid-col-sm-4-4  ibm-padding-top-1 card-frame ibm-padding-bottom-1" keyword="${this.keyword}" id="card${cardIndex}">
                      <div class="ibm-background-gray-35"><img src="${
      this.image
      }" class="ibm-resize" alt="${this.alt}">
                      <div class="ibm-padding-content">
                      <p class="ibm-type-d"></p><br>
                      <div class="event__content">
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
    cardArr.push(div);
    k = this.keyword
    if(k == "cloud") {
      cloudqty += 1
    } else if (k == "ia") {
      iaqty += 1
    } else if (k == "seguridad") {
      seguridadqty += 1
    } else if (k == "infraestructura") {
      infraestructuraqty += 1
    } else if (k == "data") {
      dataqty += 1
    } else if (k == "consultoria") {
      consultoriaqty += 1
    } else if (k == "servicios") {
      serviciosqty += 1
    }
  });
});



function mySearch() {
  var input, filter, i, txtValue, card, container, p0, p1;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  filteredCards = [];
  cardArr.map(card => {
    $("#filtercard").append(card);
    tempfilter = document.getElementById("filtercard")
    p0 = tempfilter.getElementsByTagName("p")[0];
    p1 = tempfilter.getElementsByTagName("p")[1];
    h1 = tempfilter.getElementsByTagName("h1")[0];
    txtValue = p0.textContent + p0.innerText + p1.textContent + p1.innerText + h1.textContent + h1.innerText;
    $("#filtercard").empty();
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      filteredCards.push(card);
    } 
  }) 
  DisplayList(filteredCards, rows, current_page);
  setSameHeight("event__content");
  SetupPagination(filteredCards,rows);
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
}

function filterSearch(keys) {
  current_page = 1;
  if(keys.length === 0) {
    DisplayList(cardArr, rows, current_page);
    setSameHeight("event__content");
    SetupPagination(cardArr,rows);
  } else {
    filteredCards = [];
    keys.map( key => {
      cardArr.map(card => {
        if(card.indexOf(`keyword="${key}"`) > -1)  filteredCards.push(card);
      })      
    })
  
    DisplayList(filteredCards, rows, current_page);
    setSameHeight("event__content");
    SetupPagination(filteredCards,rows);
  
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

let current_page = 1;
let rows = 9;

function DisplayList (items, rows_per_page, page) {
  $("#card__container").empty();
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    $("#card__container").append(item);

    if(items.length === 1) {
      v = document.getElementsByClassName("card-frame");
      v[0].className += " only-card";
    }
	}
}

function SetupPagination (items, rows_per_page) {
  $("#pagination").empty()

  let page_count = Math.ceil(items.length / rows_per_page);
  if(page_count > 1) {
    let btn = previousButton(items)
		$("#pagination").append(btn);
  }
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		$("#pagination").append(btn);
	}
  if(page_count > 1) {
    let btn = nextButton(items, page_count)
		$("#pagination").append(btn);
  }
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
  button.innerText = page;
  button.id = page
  
	if (current_page == page) button.classList.add('active');
  
	button.addEventListener('click', function () {
    current_page = page;
		DisplayList(items, rows, current_page);
    setSameHeight("event__content");
    
		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');
		button.classList.add('active');
	});
  
	return button;
}

function previousButton (items) {
  let button = document.createElement('button');
	icon_arrow = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination-nav__icon" width="5" height="8" viewBox="0 0 5 8" aria-hidden="true"><path d="M5 8L0 4 5 0z"></path></svg>`;
  $(button).append(icon_arrow)
  
  button.addEventListener('click', function () {
    if(current_page > 1) {
      current_page --;
      DisplayList(items, rows, current_page);
      setSameHeight("event__content");
      
      let current_btn = document.querySelector('.pagenumbers button.active');
      let current_id = current_btn.id;
      current_btn.classList.remove('active');
      next_id = parseInt(current_id) - 1
      next_active_button = document.getElementById(next_id);
      next_active_button.classList.add('active');
    }
  });
  
	return button;
}

function nextButton (items, page_count) {
  let button = document.createElement('button');
	icon_arrow = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--pagination-nav__icon" width="5" height="8" viewBox="0 0 5 8" aria-hidden="true"><path d="M0 0L5 4 0 8z"></path></svg>`;
  $(button).append(icon_arrow)
  
	button.addEventListener('click', function () {
    if(current_page < page_count) {
      current_page ++;
      DisplayList(items, rows, current_page);
      setSameHeight("event__content");
      
      let current_btn = document.querySelector('.pagenumbers button.active');
      let current_id = current_btn.id;
      current_btn.classList.remove('active');
      next_id = parseInt(current_id) + 1
      next_active_button = document.getElementById(next_id);
      next_active_button.classList.add('active');
    }
	});

	return button;
}


$(window).on("load", function () {
  setSameHeight("event__content");
  setSameHeight("ondemand__content");
  DisplayList(cardArr, rows, current_page);
  SetupPagination(cardArr, rows);
  var i, card, container;
  container = document.getElementById("cards");
  card = container.getElementsByClassName("ibm-padding-top-1");
  for (i = 0; i < card.length; i++) {
    k = card[i].getAttribute("keyword");
  }
  
  $("#checkboxes").html(`                              <div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-cloud" class="bx--checkbox" type="checkbox" value="1"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Cloud (${cloudqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-ia" class="bx--checkbox" type="checkbox" value="2"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Inteligencia Artificial (${iaqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-seguridad" class="bx--checkbox" type="checkbox" value="3"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Seguridad (${seguridadqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-infraestructura" class="bx--checkbox" type="checkbox" value="4"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Infraestructura (${infraestructuraqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-data" class="bx--checkbox" type="checkbox" value="5"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Data (${dataqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-consultoria" class="bx--checkbox" type="checkbox" value="6"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Consultoria (${consultoriaqty})</label>
</div>
<div class="bx--form-item bx--checkbox-wrapper">
  <input id="checkbox-servicios" class="bx--checkbox" type="checkbox" value="7"
    name="checkbox" onclick="check();">
  <label for="bx--checkbox-new" class="bx--checkbox-label">Servicios (${serviciosqty})</label>
</div>`);


});
