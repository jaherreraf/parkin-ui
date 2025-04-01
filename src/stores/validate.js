export const Validators = {
    validateIdentification: (id)=>{
        if (!id) return 'La identificación es requerida'
        if (!/^\d+$/.test(id)) return 'Solo números'
        if(parseInt(id)<1000 || parseInt(id)>1000000000 ) return "Cantidad de dígitos errónea"
        return ''
    },
    normalizeAndValidate: (amount)=> {
        // Reemplazar coma por punto para estandarizar
        const normalized = amount.replace(',', '.');
        // Validar formato
        if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) {
            return { isValid: false, value: null };
        }
        return { isValid: true, value: parseFloat(normalized) };
    },
    validatePlate: ( plate )=>{
        if( !plate ) return "El campo es obligatorio"
        if( plate.length < 6 || plate.length > 7 ) return "6 o 7 Dígitos"
        if( !/^[a-zA-Z0-9]+$/.test(plate) ) return "Formato incorrecto"
        return ""
    },
    validateUsername: (username) => {
        if (!username) return 'El nombre de usuario es requerido'
        if (username.length > 20) return 'Máximo 20 caracteres'
        if (/\s/.test(username)) return 'No puede contener espacios'
        if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Solo letras y números'
        return ''
    },
    validateEmail: (email) => {
        if (!email) return 'El email es requerido'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
        return ''
    },
    validatePhone: (phone) => {
        if (!phone) return 'El teléfono es requerido'
        if (!/^\d+$/.test(phone)) return 'Solo números'
        if (parseInt(phone) < 1000000000 || parseInt(phone) >9999999999 ) return 'Mínimo 10 dígitos'
        return ''
    },
    validatePassword :(password) => {
        if (!password) return 'La contraseña es requerida'
        if (password.length < 8) return 'Mínimo 8 caracteres'
        return ''
    }
}