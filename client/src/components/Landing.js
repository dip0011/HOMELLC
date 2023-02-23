import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "./images/logo.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Landing() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const token = localStorage.getItem("myToken");

  // Take user profile from database and set in local state
  useEffect(() => {
    if(token){
      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getAUserProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          toast.error(response.data?.message || 'Unable to fetch user profile', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return navigate("/login");
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message || 'Server Down', {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      });
    }else{
      toast.error('Please Login first!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/login");
    }    
  }, [navigate, token]);

  // Logout handler
  const logoutHandler = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data?.message || 'Logout Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("myToken");
          return navigate("/login");
        } else {
          toast.error(response.data?.message || 'Server Down', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response?.message || 'Server Down', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <div class="">
        <div class="row">
          <div class="bgColor col-2 d-none d-lg-inline">
            <div className="pf d-flex flex-column justify-content-between align-items-center">
              <div className="pt-2"><img className="mb-5" src={Logo} alt="logo" width={100}/></div>
              <div className="px-2">
                <div className="c-pointer font-weight-bold">NATIONAL INSIGHTS</div>
                <div className="c-pointer font-weight-bold">LOCAL INSIGHTS</div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-10 w-full">
            <div className="d-flex flex-column justify-content-around">
              <nav className="d-flex flex-column flex-sm-row justify-content-between p-2">
                <form className="d-none d-sm-flex justify-content-between form-inline m-2 my-lg-0">
                  <input className="search-input" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="search-button" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search pb-1" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></button>
                </form>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="mx-2">{user.firstName} {user.lastName}</div>
                  <div className="d-sm-inline d-none vr"></div>
                  <div className="logout-button mx-2" onClick={logoutHandler}>LOGOUT</div>
                </div>
              </nav>
              <p className="p-3 p-sm-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis porta nibh, id porta nisi. Pellentesque eu tristique magna. Proin et nisi imperdiet, accumsan dolor sed, gravida est. Curabitur vitae vestibulum quam, ac lobortis nulla. Sed ut mi enim. Pellentesque gravida gravida sapien vitae rhoncus. Vestibulum rhoncus, elit eget tincidunt porttitor, lectus justo maximus odio, nec pulvinar enim enim sed ipsum. Curabitur elementum feugiat metus eu rutrum. Curabitur sit amet dolor vitae sapien condimentum porta. Fusce aliquet, urna et ultrices ullamcorper, ipsum lorem tincidunt nisi, sed ullamcorper lacus nisl sit amet nisi. Curabitur faucibus enim sit amet augue laoreet finibus.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non eros vitae ante congue auctor sed in sapien. Ut quis massa id justo laoreet blandit. Nulla facilisi. Integer a dolor at sapien iaculis sodales. Ut vulputate ligula sed elit pellentesque tincidunt eget at lorem. Phasellus malesuada purus eget dui tincidunt, id ornare libero aliquam. Maecenas ultricies ullamcorper ex, a aliquet tortor dictum ac. Phasellus ac augue vehicula elit vehicula rutrum sed at sapien. Integer et dolor mattis, efficitur nisi nec, rhoncus orci. Integer enim felis, cursus quis lacus nec, rutrum volutpat diam. Etiam vulputate, velit sed viverra convallis, quam nunc iaculis erat, in viverra quam nisl vel libero. Nunc nec nunc lorem.

                Mauris at erat ut diam cursus placerat. Phasellus lectus lacus, gravida sodales pharetra non, vestibulum tincidunt tellus. Praesent imperdiet faucibus sem eget malesuada. Sed sed fermentum urna, ut semper dui. Proin et vestibulum ante. Quisque mattis a est pellentesque sodales. Vestibulum venenatis felis libero, gravida iaculis risus hendrerit quis. Aliquam commodo viverra ante, ac imperdiet purus ultrices in. Ut ac tincidunt urna. Phasellus sodales rhoncus nulla. Pellentesque eget velit quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut at tortor bibendum, rutrum lorem in, scelerisque leo. Vestibulum cursus at lorem a finibus. Integer ornare ex eros, in congue nunc laoreet et.

                Maecenas accumsan nisl lectus, eu bibendum erat volutpat vitae. Donec nec ipsum gravida, sodales arcu ac, vulputate neque. In hac habitasse platea dictumst. Sed blandit, odio eget posuere ultricies, metus justo ultrices risus, sed placerat arcu purus vitae tortor. Pellentesque vestibulum dolor sit amet diam facilisis, nec fermentum dolor mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur gravida dignissim leo venenatis suscipit.

                Mauris tempor lacinia sem, quis mattis augue feugiat vitae. Nam commodo elementum sem quis feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ullamcorper arcu at ligula euismod, id auctor urna efficitur. Maecenas dictum dapibus sem dignissim porta. Nulla non mi hendrerit, commodo odio sit amet, sollicitudin dui. Pellentesque commodo finibus tincidunt. Donec dapibus faucibus mollis. Pellentesque ut mollis eros, quis interdum ex. Aliquam pellentesque ex non nibh interdum molestie. Fusce orci lorem, dignissim eget interdum ut, malesuada nec sapien. Morbi ac faucibus sapien. Nunc dignissim mauris a odio placerat, id pulvinar nisl scelerisque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
