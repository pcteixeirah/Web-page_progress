var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {   
    beforeEach(function(done) {
        setTimeout(function() {
            var mongoDb = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDb, {useNewUrlParser: true});

            const db = mongoose.connection;
            db.on('error', console.error.bind(console,'connection error'));
            db.once('open', function() {
                console.log('we are connected to test database');
            });      
            done();
        }, 100);
    });
    
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err,sucess){
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance( 1,"verde", "urbana", [-34.5,-54.1]);
    
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacia', (done) => {
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                done();
            });            
        });
    });

    describe('Bicicleta.add',() => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
            Bicicleta.add(aBici, function(err,newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });            
        });        
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done)=> {
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function(err,newBici){
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color:"rojo", modelo: "urbana"});
                    Bicicleta.add(aBici2, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Debe devolver la Bicicleta con codigo 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var a1 = Bicicleta({code: 1, color: 'Black', modelo: 'Orbea', ubicacion: [42.266950, 2.956106]});
                Bicicleta.add(a1, function(err, newBici) {
                    if (err) console.log(err);

                    var a2 = Bicicleta({code: 2, color: 'White', modelo: 'Cannon', ubicacion: [41, 3]});
                    Bicicleta.add(a2, function(err, newBici) {
                        if (err) console.log(err);

                        Bicicleta.removeByCode(1, function (err) {
                            if (err) console.log(err);

                            Bicicleta.allBicis(function(err, bicis) {
                                expect(bicis.length).toBe(1);
                                
                                Bicicleta.findByCode(2, function (err, targetBici) {
                                    if (err) console.log(err);
                                    expect(targetBici.code).toBe(a2.code);
                                    expect(targetBici.color).toBe(a2.color);
                                    expect(targetBici.modelo).toBe(a2.modelo);
                                    done();
                                    console.log('OK! Modelo/Bicicleta.findByCode: Funciona correctamente');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
/*
//antes de cada test limpia colecciones
beforeEach(() => {Bicicleta.allBicis = [] });

//poner nombre del metodo que estoy testeando
describe('Bicicleta.allBicis', () => {
    //que quiero probar
    it('comienza vacia', () => {
        //qué está esperando
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'blanca', 'urbana', [-34.566932, -58.3808287]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

//resetear la coleccion entre cada test

describe('Bicicleta.finById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "rojo", "montaña");

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});
*/