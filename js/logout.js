function logout(){
    console.log('entra')
    localStorage.clear();
    window.location.href = "../index.html";
}
export {logout}