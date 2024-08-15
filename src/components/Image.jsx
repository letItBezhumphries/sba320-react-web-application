import React from 'react';
import { useEffect, useState } from 'react';
import ButtonTooltip from './ButtonTooltip';

const Image = ({ imgSrc, imgAlt, classType }) => {
  // console.log('imgSrc passed to Image:', imgSrc);

  return imgSrc !== undefined && imgSrc.length > 0 ? (
    <>
      <img src={imgSrc} alt={imgAlt} className={classType} />
      <ButtonTooltip />
    </>
  ) : null;
};

export default Image;
