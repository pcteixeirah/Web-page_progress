var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', 'urbana', [-34.566932, -58.3808287]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });
});

describe('POST BICICLETAS /create', () => {
    //esperar que termine de crear
    it('Status 200', (done) => {
        var headers = {'content-type': 'application/json'};
        var aBici = '{ "id": 10, "color": "rojo", "modelo":"urbana", "lat": -34, "lng": -34 }'
        
        request.post({
            headers:headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: aBici
        },  function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo")
                done();
        });
    });
});

//TODO delete + update