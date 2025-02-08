import React from "react";
import {NavLink} from "react-router-dom";
import {categories} from "../../globalConstants.ts";

const CategoryMenu: React.FC = () => {
    return (
        <nav>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <NavLink to={`/quotes/${category.id}`}>{category.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoryMenu;