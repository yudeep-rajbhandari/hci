/**
 * Created by root on 7/12/17.
 */
/**

 */

var service=angular.module('BackendService',[]);

service.factory('service',['$http',function($http) {

    var saveHttp = function (data, url, callback) {
        $http({
            method: 'POST',
            url: url,
            data: data
        }).then(function successCallback(response) {
            callback(false, response);
        }, function errorCallback(response) {
            callback(true, response);


            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var getHttp = function ( url, callback) {
        $http({
            method: 'GET',
            url: url

        }).then(function successCallback(response) {
            callback(false, response);
        }, function errorCallback(response) {
            callback(true, response);


            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var putHttp = function ( url, callback) {
        $http({
            method: 'PUT',
            url: url

        }).then(function successCallback(response) {
            callback(false, response);
        }, function errorCallback(response) {
            callback(true, response);


            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    var deleteHttp = function ( data,url, callback) {
        $http({
            method: 'POST',
            url: url,
            data:data

        }).then(function successCallback(response) {
            callback(false, response);
        }, function errorCallback(response) {
            callback(true, response);


            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    return {
        save:function(data,url,callback){
            saveHttp(data,url,callback);
        },
        get:function(url,callback){
            getHttp(url,callback)
        },
        delete:function(data,url,callback){
            deleteHttp(data,url,callback)
        },
        put:function(url,callback){
            putHttp(url,callback)
        }
    };
}]);

