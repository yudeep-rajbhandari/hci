var app = angular.module('hciproject', ['ui.router', 'BackendService', 'toaster', 'checklist-model',
    'service.authorization']);

app.run(function (principal,$rootScope, VisualService) {
    principal.identity().then(function (data12) {
        console.log(data12)
        if (data12) {
            $rootScope.userData = data12;
        }
    })
    $rootScope.showLoader=true;
    VisualService.data1();


})

app.service('VisualService', function ($rootScope, service) {
    var self = this;
    self.data = [];


    this.data1 = function () {


        service.get('/data/getdata', function (err, response) {
            if (err) {
                throw (err);
            }
            else {
                self.data = response.data.data;
                $rootScope.showLoader = false;
            }
        })
    }


})

//console.log(country);
app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/home/homepage');
    $stateProvider


        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'templates/navbar.html',
            controller:'signUpController',
            data: {
                roles: []
            }

        })
        .state('home.homepage', {
            url: '/homepage',
            templateUrl: 'templates/homepage.html',
            data: {
                roles: []
            }


        })
        .state('home.viewdata', {
            url: '/viewdata',
            templateUrl: 'templates/viewdata.html',
            controller: 'VisualController',
            data: {
                roles: []
            }

        })
        .state('home.addform', {
            url: '/addform',
            templateUrl: 'templates/addform.html',
            controller: 'countrycontroller',
            data: {
                roles: ['admin']
            }

        })


        .state('home.loginform', {
            url: '/loginform',
            templateUrl: 'templates/login.html',
            controller:'signUpController',
            data: {
                roles: []
            }


        })

        .state('home.view', {
            url: '/view',
            templateUrl: 'templates/view.html',
            controller: 'DataController',
            data: {
                roles: ['admin']
            }

        })
}])

app.controller('signUpController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope', '$stateParams',
    function ($scope, $http, toaster, $state, principal, service, $rootScope, $stateParams) {
        $scope.formdata = {};
        $scope.logout = function () {
            console.log('<<<<<<<<<');
            principal.authenticate(null);
            $rootScope.userData = null;
            $state.go('home.homepage');



        }

        $scope.checkForm = function () {
            service.save({user: $scope.formdata}, "/users/login", function (err, response) {

                if (!err) {

                    if (response.data.user) {
                        var userData = {
                            userid: response.data.user._id, roles: response.data.user.role,
                            username: response.data.user.name
                        }
                        principal.authenticate(userData);

                        $rootScope.userData = userData;


                        $state.go('home.homepage');
                    }
                    else {

                        toaster.pop('success', "oops", "wrong username or password");
                    }

                } else {

                    console.log(response);
                }

            })
        }
    }])
app.controller('countrycontroller', ['$scope', '$http', '$state', 'service', '$rootScope', '$stateParams', 'toaster','principal','VisualService','$timeout',
    function ($scope, $http, $state, service, $rootScope, $stateParams, toaster,principal,VisualService,$timeout) {
        $scope.formdata = {};





        $scope.formsubmit = function () {
            console.log($scope.formdata);
            service.save({savedata: $scope.formdata}, '/data/savedata', function (err, response) {
                if (err) {
                    throw (err)
                }
                else {
                    console.log("jadai cha");
                    toaster.pop("Success", "You have successfully added data  " + response.data.data.Title);
                    $state.go("home.homepage");

                    VisualService.data1();

                    // toaster.pop("Success","successfully added your note with topic  "+response.data.data.NoteTopic);
                }
            })
        }
        $scope.csvJson=function(abc){

            var lines=abc.split("\n");

            var result = [];

            var headers=lines[0].split(",");

            for(var i=1;i<lines.length;i++){

                var obj = {};
                var currentline=lines[i].split(",");

                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }

                result.push(obj);

            }

            //return result; //JavaScript object
            return JSON.stringify(result); //JSON

        }




            // $scope.csvJson($scope.f);






        $scope.country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo (Brazzaville)", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor Timur)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
    }])

app.controller('DataController', ['$scope', '$http', '$state', 'service', 'toaster','$stateParams','VisualService',
    function ($scope, $http, $state, service, toaster,$stateParams,VisualService) {

    // service.get('/data/findData',function(err,response){
    //
    //     if(err){
    //         throw (err);
    //     }
    //     else{
    //         $scope.titles=response.data.data;
    //     }
    // })
    $scope.searchdata = {};
    $scope.deleter = [];
    $scope.data1=[];
    console.log($scope.deleter);
    $scope.checkbox=false;
    $scope.tableshow=false;




    $scope.deletefun = function (data1) {
        console.log(data1);
        if (typeof data1 !== 'undefined' && data1.length > 0) {
            service.delete({deletedata: data1}, '/data/deletedata', function (err, response) {
                if (err) {
                    throw (err);
                }
                else {
                    console.log(response);
                    toaster.pop("Success", "Successfully deleted ");
                    $scope.deleter=[];
                    VisualService.data1();
                    $state.reload();


                }


            })

        }
else {
            toaster.pop("Success","please select something")

        }
    }




    $scope.search = function () {
        console.log($scope.searchdata.data);
        document.getElementById('mover').style.cssText='top:0px;position: fixed;z-index: 100;';
        document.getElementById('titlesearch').style.display='none';
        document.getElementById('inputid').style.cssText='height=25px;width=200px';
        $scope.tableshow=true;


        service.save({searchData: $scope.searchdata.data}, '/data/search', function (err, response) {
            if (err) {
                throw (err);

            }

            else {

                $scope.alldatas = response.data.data;
                console.log($scope.alldatas);
                if ($scope.alldatas.length == 0) {
                    toaster.pop("Warning", "Sorry no data found.")
                }
            }


        })
    }
}])

app.controller('VisualController', ['$scope', '$http', '$state', 'service', '$rootScope','principal', '$stateParams', 'VisualService',
    function ($scope, $http, $state, service, $rootScope,principal, $stateParams,VisualService) {
   // $rootScope.showLoader = false;
    $scope.filterchecker = false;
        $scope.visualdata = [];
    var count;

        $scope.scrollFunc=function (abc) {
            if (abc == 1) {

                var element1 = document.getElementById('table123');
                element1.scrollIntoView();
            }
            if (abc == 0) {
                var element2 = document.getElementById('chart123');
                element2.scrollIntoView();
            }
        }

    $scope.$watch(function () {
        return VisualService.data;
    },function (newData,oldData) {
        console.log(newData);

        $scope.visualdata=newData;



        $scope.visualContent();





    })

    // service.get('/data/getdata', function (err, response) {
    //     if (err) {
    //         throw (err);
    //     }
    //     else {
    //         $scope.visualdata = response.data.data;
    //         console.log(response);
    //         console.log($scope.visualdata[1]);
    //         count = Object.keys($scope.visualdata).length;
    //         console.log(count);
    //         $scope.showLoader = false;
    //         $scope.visualContent();
    //
    //
    //     }
    // })


    $scope.resetAll = function () {
        $scope.resetdata();


    }
    $scope.visualContent = function () {


        var chart = dc.pieChart("#test");
        var chart1 = dc.pieChart("#test1");
        var chart2 = dc.rowChart("#test2");
        var chart3 = dc.barChart("#test3");
        var div = document.getElementById('placeholder');

        var Table = dc.dataTable('.dc-data-table');
        // d3.csv("./dataset1.csv", function (err,data) {
        //     data.forEach(val=>{
        //         val.count=1;
        // })

        $scope.resetdata = function () {
            chart2.filterAll();
            dc.redrawAll();
        }


        var ndx = crossfilter($scope.visualdata),

            YearDimension = ndx.dimension(function (d) {
                return d.Year;
            }),
            CategoryDimension = ndx.dimension(function (d) {
                return d['Category'];
            }),
            ConferenceDimension = ndx.dimension(function (d) {
                return d['Conference'];
            }),
            countryDimension = ndx.dimension(function (d) {
                return d.country;

            })


        YearSumGroup = YearDimension.group().reduceCount(function (d) {
            return +d.count;
        }),
            ConferenceSumGroup = ConferenceDimension.group().reduceCount(function (d) {
                return +d.count;
            }),
            CategorySumGroup = CategoryDimension.group().reduceCount(function (d) {
                return +d.count;
            }),
            countryGroup = countryDimension.group().reduceCount(function (d) {
                return +d.count;

            })


        // Category1Dimension = ndx.dimension(function (d) {
        //     return d.key;
        // }),

        // Category1SumGroup = Category1Dimension.group().reduceSum(function (d) {
        //     return +d.value;
        // }).top(10);
        fakeGroup = getTops(countryGroup);
        ;
        $scope.sendvalue = function () {
            var e = document.getElementById("val");
            var strUser = e.options[e.selectedIndex].value;
            val1 = strUser;
            console.log(strUser);
            chart2.cap(val1);
            if (val1 <= 20) {
                chart2.render()
            }
            else {
                chart2.height(val1 * 20);
                chart2.render();
            }
            // return strUser;


        }

        // var e = document.getElementById("val");
        // var strUser = e.options[e.selectedIndex].value;
        document.getElementById("val").onchange = function () {
            $scope.sendvalue()
        };
        // var xRange = [-10, d3.max(ConferenceSumGroup.all(), function(d) { return +d.count; }) ],
        //     yRange = [-10, d3.max(ConferenceSumGroup.all(), function(d) { return +d.count; }) ];
        function getTops(source_group) {
            return {
                all: function () {
                    return source_group.top(20);
                }
            };
        }


        //console.log(Category1SumGroup);
        chart
            .width(400)
            .height(250)
            // .slicesCap(4)

            .dimension(YearDimension)
            .group(YearSumGroup)
            .legend(dc.legend())
            .minAngleForLabel(0.1)
        chart1
            .width(400)
            .height(250)
            .slicesCap(10)

            .dimension(ConferenceDimension)
            .group(ConferenceSumGroup)
            .legend(dc.legend())
            .minAngleForLabel(0.2)


        chart2
            .width(900)
            .height(400)
            .dimension(CategoryDimension)
            .group(CategorySumGroup)
            .cap(document.getElementById("val").value)
            .othersGrouper(false)

        chart3
            .width(900)
            .height(380)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel('Country')
            .yAxisLabel('Number')
            .dimension(countryDimension)
            .barPadding(0.1)
            .outerPadding(0.05)
            .group(fakeGroup);

        Table /* dc.dataTable('.dc-data-table', 'chartGroup') */
            .dimension(YearDimension)
            // Data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function (d) {
                var format = d3.format('02d');
                return d.Year;
            })
            // (_optional_) max number of records to be shown, `default = 25`
            .size(50)
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                // Use the `d.date` field; capitalized automatically
                'Year',
                'Conference',
                'Category',
                'Title',
                'Institution',
                'country'
            ])

            // (_optional_) sort using the given field, `default = function(d){return d;}`
            .sortBy(function (d) {
                return d.Year;
            })
            // (_optional_) sort order, `default = d3.ascending`
            .order(d3.ascending)
            // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
            .on('renderlet', function (table) {
                table.selectAll('.dc-table-group').classed('info', true);
            })


        // workaround for #703: not enough data is accessible through .label() to display percentages
        //     .on('pretransition', function (chart) {
        //         chart.selectAll('text.pie-slice').text(function (d) {
        //             return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
        //         })
        //     });
        dc.renderAll();
    }


}])


//var country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo (Brazzaville)", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor Timur)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

//for(i=0;i<=country.length;i++){


//document.getElementById("pa").innerHTML = country[i];
//}