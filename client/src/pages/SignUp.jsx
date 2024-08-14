import { Alert, Button, Label,Spinner, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessages("Please fill out all fields!");
    }
    try {
      setLoading(true); // Loading durumunu başlat
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();
      console.log('User signed up:', data);
      setErrorMessages(null);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessages("An error occurred, please try again later.");
    } finally {
      setLoading(false); // Loading durumunu sonlandır
    }
  };

  useEffect(() => {
    if (errorMessages) {
      const timer = setTimeout(() => setErrorMessages(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Sol taraf */}
        <div className="flex-1 text-center md:text-left">
          <Link to='/' className='font-bold text-3xl md:text-4xl'>
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
              İbrahim's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nostrum itaque ratione.
          </p>
        </div>
        {/* Sağ taraf */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput 
                type="text" 
                placeholder="Username" 
                id="username" 
                onChange={handleChange} 
                className="w-full md:w-72"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput 
                type="email" 
                placeholder="name@company.com" 
                id="email" 
                onChange={handleChange} 
                className="w-full md:w-72"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput 
                type="password" 
                placeholder="Password" 
                id="password" 
                onChange={handleChange} 
                className="w-full md:w-72"
              />
            </div>
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded w-full md:w-72 flex items-center justify-center" 
              type="submit"
              disabled={loading} // Buton yükleme durumuna göre devre dışı bırakılır
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
          <div className="flex flex-col items-start mt-5">
            {errorMessages && (
              <div className="w-full md:w-72">
                <Alert className="w-full border-2 border-red-500 bg-red-100 text-red-700 px-4 py-2">
                  {errorMessages}
                </Alert>
              </div>
            )}
          </div>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">Sign In</Link> 
          </div>
        </div>
      </div>
    </div>
  );
}
