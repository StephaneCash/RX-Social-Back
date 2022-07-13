module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (err.message.includes('email'))
        errors.email = "Email incorrect"

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire minimum 6 caractères";

    if (err.code === 11000)
        errors.email = "Cet email est déjà pris";

    return errors;
}