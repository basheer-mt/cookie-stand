"use strict"


function BranchLocation (location, min, max, avgCookies, openHour, closeHour) {
    this.location = location;
    this.minCustomers = min;
    this.maxCustomers = max;
    this.avgCookiesPerCustomer = avgCookies;
    this.openHour = openHour; 
    this.closeHour = closeHour; 
  
    this.hoursList = []; 
    this.cookiesPerHourArray = [];
  
    this.getCookiesForOpenHours();
  };
  
  BranchLocation.prototype.getCustomersPerHour = function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
    return random;
  };
  
  BranchLocation.prototype.refactorHours = function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + ':00am');
      } else if (i === 12) {
        this.hoursList.push(i + ':00pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + ':00pm')
      }
    }
    return this.hoursList;
  };
  
  BranchLocation.prototype.getCookiesForOpenHours = function () {
    this.refactorHours();
  
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.getCustomersPerHour());
      this.cookiesPerHourArray.push(cookiesEachHour);
    };
    return this.cookiesPerHourArray;
  };
  
  BranchLocation.prototype.dailyLocationTotal = function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
      sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
    }
    return sumOfCookies;
  };
  
  BranchLocation.prototype.renderTableHeaders = function () {
    var table = document.getElementById('cookieData');
    var row = document.createElement('tr');
    var tableHeadCell = document.createElement('th');
    row.appendChild(tableHeadCell);
  
    // hour of the day headers
    for (var i = 0; i < this.hoursList.length; i++) {
      tableHeadCell = document.createElement('th');
      tableHeadCell.textContent = this.hoursList[i];
      row.appendChild(tableHeadCell);
    }
    // total header
    tableHeadCell = document.createElement('th');
    tableHeadCell.textContent = 'Daily Location Total';
    row.appendChild(tableHeadCell);
  
    table.appendChild(row);
  };
  
  BranchLocation.prototype.renderTableData = function () {
    var table = document.getElementById('cookieData');
    var row = document.createElement('tr');
  
    // Branch location cell
    var cityNameCell = document.createElement('td');
    cityNameCell.textContent = this.location;
    row.appendChild(cityNameCell);
  
    // cookie data x 14
    for (var i = 0; i < this.hoursList.length; i++) {
      var tableDataCell = document.createElement('td');
      tableDataCell.textContent = this.cookiesPerHourArray[i];
      row.appendChild(tableDataCell);
    }
  
    tableDataCell = document.createElement('td');
    tableDataCell.textContent = this.dailyLocationTotal();
    row.appendChild(tableDataCell);
  
    table.appendChild(row);
  };
  
  BranchLocation.prototype.renderTableFooter = function (allLocations) {
    var table = document.getElementById('cookieData');
    var row = document.createElement('tr');
    var tableFootCell = document.createElement('th');
    tableFootCell.textContent = 'Totals';
    row.appendChild(tableFootCell);
    
    var cookieTotalArray = [];
    
    for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
      var cookieTotal = 0;
      
      for (var j = 0; j < allLocations.length; j++) {
        cookieTotal = cookieTotal + allLocations[j].cookiesPerHourArray[i];
      }
      cookieTotalArray.push(cookieTotal);
      tableFootCell = document.createElement('td');
      tableFootCell.textContent = cookieTotalArray[i];
      row.appendChild(tableFootCell);
    }
  
    var superTotal = 0;
    for (var i = 0; i < allLocations.length; i++) {
      superTotal = superTotal + allLocations[i].dailyLocationTotal();
    }
    tableFootCell = document.createElement('td');
    tableFootCell.textContent = superTotal;
    row.appendChild(tableFootCell);
  
    table.appendChild(row);
  };
  
  var seattle = new BranchLocation('Seattle', 23, 65, 6.3, 6, 20);
  seattle.renderTableHeaders(); 
  seattle.renderTableData();
  
  var tokyo = new BranchLocation('Tokyo', 3, 24, 1.2, 6, 20);
  tokyo.renderTableData();
  
  var dubai = new BranchLocation('Dubai', 11, 32, 3.7, 6, 20);
  dubai.renderTableData();
  
  var paris = new BranchLocation('Paris', 20, 38, 2.3, 6, 20);
  paris.renderTableData();
  
  var lima = new BranchLocation('Lima', 2, 16, 4.6, 6, 20);
  lima.renderTableData();
  
 
  var allLocations = [seattle, tokyo, dubai, paris, lima];
  seattle.renderTableFooter(allLocations); 




//   function Cookies(location, min, max, avg) {
//       this.location = location;
//       this.min = min; 
//       this.max = max;
//       this avg = avg;
//       this.hourlySales = [];
//       this.dailySales = 0;

      
      
//   }
//    Cookies.randomCust =  function () {
    //         let range = seattleCookies.max - seattleCookies.min;
    //         let randomCount = Math.random() * range + seattleCookies.min;
    //         return Math.ceil(randomCount);
    //     },
    
    //     Cookies.hourlyDailySales = function () {
    //         for (var i = 0; i < hours.length; i++) {
    //             let numOfCookies = Math.ceil(seattleCookies.randomCust() * seattleCookies.avgCookieSale);
    //             seattleCookies.hourlySales.push(numOfCookies);
    //             seattleCookies.dailySales += numOfCookies;
    //         }
    //     },





//   let hours=["6am " ,'7am ','8am','9am','10am','11am','12pm ','1pm ','2pm ','3pm ','4pm ','5pm ','6pm ','7pm '];
// //seattle
// let seattleCookies = {
//     location: 'Seattle',
//     min: 23,
//     max: 65,
//     avgCookieSale: 6.3,
//     hourlySales: [],
//     dailySales: 0,

//     randomCust: function () {
//         let range = seattleCookies.max - seattleCookies.min;
//         let randomCount = Math.random() * range + seattleCookies.min;
//         return Math.ceil(randomCount);
//     },

//     hourlyDailySales: function () {
//         for (var i = 0; i < hours.length; i++) {
//             let numOfCookies = Math.ceil(seattleCookies.randomCust() * seattleCookies.avgCookieSale);
//             seattleCookies.hourlySales.push(numOfCookies);
//             seattleCookies.dailySales += numOfCookies;
//         }
//     },

//     render: function () {
//         let container = document.getElementById('ulSales');
//         let h2 = document.createElement('h2');
//         container.appendChild(h2);
//         h2.textContent = 'Seattle';
//         container.appendChild(h2);
//         let list = document.createElement('ul');
//         container.appendChild(list);
//         for (var i = 0; i < hours.length; i++) {
//             let listItem = document.createElement('li');
//             listItem.textContent = hours[i] + ': ' + seattleCookies.hourlySales[i] + ' cookies';
//             list.appendChild(listItem);
//         }
//         let listItem = document.createElement('li');
//         listItem.textContent = 'Total: ' + seattleCookies.dailySales + ' cookies';
//         list.appendChild(listItem);


//     },
// }


// seattleCookies.hourlyDailySales();
// seattleCookies.render();







// //Tokyo
// let tokyoCookies = {
//     location: 'Tokyo',
//     min: 3,
//     max: 24,
//     avgCookieSale: 1.2,
//     hourlySales: [],
//     dailySales: 0,

//     randomCust: function () {
//         let range = tokyoCookies.max - tokyoCookies.min;
//         let randomCount = Math.random() * range + tokyoCookies.min;
//         return Math.ceil(randomCount);
//     },

//     hourlyDailySales: function () {
//         for (var i = 0; i < hours.length; i++) {
//             let numOfCookies = Math.ceil(tokyoCookies.randomCust() * tokyoCookies.avgCookieSale);
//             tokyoCookies.hourlySales.push(numOfCookies);
//             tokyoCookies.dailySales += numOfCookies;
//         }
//     },

//     render: function () {
//         let container = document.getElementById('ulSales');
//         let h2 = document.createElement('h2');
//         container.appendChild(h2);
//         h2.textContent = 'Tokyo';
//         container.appendChild(h2);
//         let list = document.createElement('ul');
//         container.appendChild(list);
//         for (var i = 0; i < hours.length; i++) {
//             let listItem = document.createElement('li');
//             listItem.textContent = hours[i] + ': ' + tokyoCookies.hourlySales[i] + ' cookies';
//             list.appendChild(listItem);
//         }
//         let listItem = document.createElement('li');
//         listItem.textContent = 'Total: ' + tokyoCookies.dailySales + ' cookies';
//         list.appendChild(listItem);


//     },
// }


// tokyoCookies.hourlyDailySales();
// tokyoCookies.render();
// //Dubai
// let dubaiCookies = {
//     location: 'Dubai',
//     min: 11,
//     max: 38,
//     avgCookieSale: 3.7,
//     hourlySales: [],
//     dailySales: 0,

//     randomCust: function () {
//         let range = dubaiCookies.max - dubaiCookies.min;
//         let randomCount = Math.random() * range + dubaiCookies.min;
//         return Math.ceil(randomCount);
//     },

//     hourlyDailySales: function () {
//         for (var i = 0; i < hours.length; i++) {
//             let numOfCookies = Math.ceil(this.randomCust() * this.avgCookieSale);
//             dubaiCookies.hourlySales.push(numOfCookies);
//             dubaiCookies.dailySales += numOfCookies;
//         }
//     },

//     render: function () {
//         let container = document.getElementById('ulSales');
//         let h2 = document.createElement('h2');
//         container.appendChild(h2);
//         h2.textContent = 'Dubai';
//         container.appendChild(h2);
//         let list = document.createElement('ul');
//         container.appendChild(list);
//         for (var i = 0; i < hours.length; i++) {
//             let listItem = document.createElement('li');
//             listItem.textContent = hours[i] + ': ' + dubaiCookies.hourlySales[i] + ' cookies';
//             list.appendChild(listItem);
//         }
//         let listItem = document.createElement('li');
//         listItem.textContent = 'Total: ' + dubaiCookies.dailySales + ' cookies';
//         list.appendChild(listItem);


//     },
// }


// dubaiCookies.hourlyDailySales();
// dubaiCookies.render();
// //Paris
// let parisCookies = {
//     location: 'Paris',
//     min: 20,
//     max: 38,
//     avgCookieSale: 3.7,
//     hourlySales: [],
//     dailySales: 0,

//     randomCust: function () {
//         let range = parisCookies.max - parisCookies.min;
//         let randomCount = Math.random() * range + this.min;
//         return Math.ceil(randomCount);
//     },

//     hourlyDailySales: function () {
//         for (var i = 0; i < hours.length; i++) {
//             let numOfCookies = Math.ceil(parisCookies.randomCust() * parisCookies.avgCookieSale);
//             parisCookies.hourlySales.push(numOfCookies);
//             parisCookies.dailySales += numOfCookies;
//         }
//     },

//     render: function () {
//         let container = document.getElementById('ulSales');
//         let h2 = document.createElement('h2');
//         container.appendChild(h2);
//         h2.textContent = 'Paris';
//         container.appendChild(h2);
//         let list = document.createElement('ul');
//         container.appendChild(list);
//         for (var i = 0; i < hours.length; i++) {
//             let listItem = document.createElement('li');
//             listItem.textContent = hours[i] + ': ' + parisCookies.hourlySales[i] + ' cookies';
//             list.appendChild(listItem);
//         }
//         let listItem = document.createElement('li');
//         listItem.textContent = 'Total: ' + parisCookies.dailySales + ' cookies';
//         list.appendChild(listItem);


//     },
// }


// parisCookies.hourlyDailySales();
// parisCookies.render();


// //Lima
// let limaCookies = {
//     location: 'Lima',
//     min: 2,
//     max: 16,
//     avgCookieSale: 4.6,
//     hourlySales: [],
//     dailySales: 0,

//     randomCust: function () {
//         let range = limaCookies.max - limaCookies.min;
//         let randomCount = Math.random() * range + this.min;
//         return Math.ceil(randomCount);
//     },

//     hourlyDailySales: function () {
//         for (var i = 0; i < hours.length; i++) {
//             let numOfCookies = Math.ceil(limaCookies.randomCust() * limaCookies.avgCookieSale);
//             limaCookies.hourlySales.push(numOfCookies);
//             limaCookies.dailySales += numOfCookies;
//         }
//     },

//     render: function () {
//         let container = document.getElementById('ulSales');
//         let h2 = document.createElement('h2');
//         container.appendChild(h2);
//         h2.textContent = 'Lima';
//         container.appendChild(h2);
//         let list = document.createElement('ul');
//         container.appendChild(list);
//         for (var i = 0; i < hours.length; i++) {
//             let listItem = document.createElement('li');
//             listItem.textContent = hours[i] + ': ' + limaCookies.hourlySales[i] + ' cookies';
//             list.appendChild(listItem);
//         }
//         let listItem = document.createElement('li');
//         listItem.textContent = 'Total: ' + limaCookies.dailySales + ' cookies';
//         list.appendChild(listItem);


//     },
// }


// limaCookies.hourlyDailySales();
// limaCookies.render();