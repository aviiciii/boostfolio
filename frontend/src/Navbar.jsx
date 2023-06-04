import Logo from './logo.svg';
const Navbar = ()=>{
    return (
    <div className="navbar">
        <div>
            <img src={Logo} alt="logo" style={{"width":"22px","padding":"5px","margin-right":"5px"}} />
            <b className='name'>BoostFolio</b>
        </div>

    </div>)
}
export default Navbar;