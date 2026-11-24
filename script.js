class Movimiento {
    constructor(nombre, tipo, valor) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
    }
    esIngreso() {
        return this.tipo === 'ingreso';
    }
    esGasto() {
        return this.tipo === 'gasto';
    }

    esValido() {
    return (
        this.nombre.trim() !== '' &&
        (this.tipo === 'ingreso' || this.tipo === 'gasto') &&
        typeof this.valor === 'number' &&
        Number.isFinite(this.valor) &&
        this.valor > 0
    );
}

    datosMovimiento() {
        let signo;
        if (this.esIngreso()) {
            signo = '+';
        } else {
            signo = '-';
        }
        return `${this.nombre} (${this.tipo}): ${signo}S/. ${this.valor.toFixed(2)} `
    }
}

class Presupuesto {
    constructor() {
        this.movimientos = [];
    }
    agregarMovimiento(movimiento) {
        if (movimiento.esValido()) {
        this.movimientos.push(movimiento);
        console.log('Movimiento registrado correctamente.');
        } else {
        console.log('Error: movimiento inválido.');
        }

    }

    obtenerIngresos() {
        return this.movimientos.filter(valor => valor.esIngreso());
    }
    totalIngresos() {
        return this.obtenerIngresos().reduce((acumulador, val) => acumulador + val.valor, 0);
    }
    obtenerGastos() {
        return this.movimientos.filter(valor => valor.esGasto());
    }
    totalGastos() {
        return this.obtenerGastos().reduce((acumulador, val) => acumulador + val.valor, 0);
    }

    saldoTotal() {
        return this.totalIngresos() - this.totalGastos();
    }

    topGastos() {
        return this.obtenerGastos().sort((a, b) => b.valor - a.valor).slice(0, numero);
    }
    verificarLimites(){
        let porcentaje = (80/100)*this.totalIngresos();
        const gastos = this.totalGastos();
        const limite = (80/100)*this.totalIngresos();

        return gastos > limite ? `Gastaste demasiado ${gastos}`:`Gasto Correcto ${gastos}`;
    }
}

function registrarMovimiento() {
    const nombre = prompt('Nombre del movimiento:');
    const tipo = prompt('Tipo (ingreso / gasto):');
    const valor = parseFloat(prompt('Monto:'));

   
    // 1 solo push de un objeto. valor SIEMPRE positivo.
    const movimiento = new Movimiento (nombre,tipo,valor);
    datoPresupuesto.agregarMovimiento(movimiento);
}

const imprimirReporte = datoPresupuesto => {
    console.log('--- Resumen Final ---');

    datoPresupuesto.movimientos.forEach((movimiento, indice) => {
        console.log(`  ${indice + 1}. ${movimiento.datosMovimiento()}`);
        
    });
    console.log(`Ingreso Total: ${datoPresupuesto.totalIngresos()}`);
    console.log(`Saldo total: ${datoPresupuesto.saldoTotal()}`);
    console.log(`${datoPresupuesto.verificarLimites()}`);
    

};
let datoPresupuesto = new Presupuesto();
let continuar = 'si';
while (continuar === 'si') {
    registrarMovimiento();
    continuar = prompt('¿Registrar otro movimiento? (si/no):');
}
imprimirReporte(datoPresupuesto);