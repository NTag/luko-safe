import React, { useState, useEffect } from 'react';

import { getCategories } from '../services/api';
import Picker from './Picker';

export default (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <Picker items={categories} {...props} />
  );
};
