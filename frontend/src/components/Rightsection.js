import { SiGmail } from "react-icons/si"
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { useEffect, useState } from "react"
// import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";


function Rightsection() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await axiosInstance.get("/category");
      setCategories(response.data);
    }
    getCategories();
  })
  return (
    <>
      <div className="right__section__item">
        <span className="right__section__title">ABOUT ME</span>
        <img src="/assets/images/img2.jpg" alt="" className="right__section__image" />
        <p className="right__section__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in represt laborum.</p>
      </div>
      <hr className="right__section__hr" />
      <div className="right__section__item">
        <span className="right__section__title">CATEGORIES</span>
        <ul className="right__section__list">
          {categories.map((category) => (
            <Link to={`/?category=${category.name}`}>
              <li className="right__section__list__item">{category.name}</li>
            </Link>
          ))}


          {/* <li className="right__section__list__item">Music</li>
          <li className="right__section__list__item">Style</li>
          <li className="right__section__list__item">Tech</li>
          <li className="right__section__list__item">Sports</li> */}
        </ul>
      </div>
      <hr className="right__section__hr" />
      <div className="right__section__item">
        <span className="right__section__title">FOLLOW US</span>
        <div className="right__section__social">
          <FaFacebookF className="right__section__icon facebook" />
          <FaTwitter className="right__section__icon twitter" />
          <SiGmail className="right__section__icon gmail" />
        </div>

      </div>
    </>
  )
}

export default Rightsection
