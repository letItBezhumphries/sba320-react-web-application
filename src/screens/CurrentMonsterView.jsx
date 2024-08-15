import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import ButtonTooltip from '../components/ButtonTooltip';

const CurrentMonsterView = ({ monster, loading, error }) => {
  const [imgSrc, setImgSrc] = useState('');

  console.log(
    'monster passed into CurrentMonsterView:',
    monster,
    'state imgSrc:',
    imgSrc
  );
  useEffect(() => {
    if (!monster.img_main || monster.img_main === null) {
      console.log('setting to empty string');
      setImgSrc('');
    } else {
      setImgSrc(monster.img_main);
    }
  }, [monster, monster.img_main]);

  const renderMonsterSpeed = function (speed) {
    let output = '';
    for (let key in speed) {
      output += key + ' ' + speed[key] + ',';
    }
    return output;
  };

  const renderMonsterSkills = function (skills) {
    let skillsStr = '';

    if (skills !== null || skills !== undefined) {
      for (let key in skills) {
        // console.log('key:', key, skills[key]);
        skillsStr += key + ' ' + skills[key] + ' ';
      }
    }

    return skillsStr;
  };

  const renderMonsterSavingsThrows = function () {
    let savingsThrowStr = '';
    if (monster.charisma_save !== null) {
      savingsThrowStr += `Cha +${monster.charisma_save}` + ' ';
    }
    if (monster.dexterity_save !== null) {
      savingsThrowStr += `Dex +${monster.dexterity_save}` + ' ';
    }
    if (monster.constitution_save !== null) {
      savingsThrowStr += `Con +${monster.constitution_save}` + ' ';
    }

    if (monster.intelligence_save !== null) {
      savingsThrowStr += `Int +${monster.intelligence_save}` + ' ';
    }

    if (monster.strength_save !== null) {
      savingsThrowStr += `Str +${monster.strength_save}` + ' ';
    }

    if (monster.wisdom_save !== null) {
      savingsThrowStr += `Wis +${monster.wisdom_save}` + ' ';
    }

    return savingsThrowStr;
  };

  const renderMonsterSpecials = (special_abilities) => {
    return special_abilities.map((special, index) => {
      return (
        <p key={index} className='special-ability'>
          <span className='ability-name'>{special.name} - </span>
          {special.desc}
        </p>
      );
    });
  };

  const renderMonsterActions = (actions) => {
    return actions.map((action, index) => {
      return (
        <p key={index} className='monster-action'>
          <span className='action-name'>{action.name} -</span>
          {action.desc}
        </p>
      );
    });
  };

  const renderMonsterLegendaryActions = (legendary_actions) => {
    return legendary_actions.map((legend, index) => {
      return (
        <p key={index} className='monster-action'>
          <span className='action-name'>{legend.name} - </span>
          {legend.desc}
        </p>
      );
    });
  };

  return (
    <div className='monster-view'>
      <div className='img-container'>
        {!loading && monster ? (
          <>
            <Image
              imgSrc={imgSrc}
              imgAlt={`image of ${monster.name}`}
              classType='monster-image'
            />
          </>
        ) : null}
      </div>
      <div className='monster-info'>
        <h3 className='monster-name'>{monster.name}</h3>
        {/* <p className='type'>
          {monster.size}, {monster.type}, {monster.alignment}
        </p> */}
        <div style={{ display: 'flex' }}>
          <p className='type'>
            {monster.size}, {monster.type}, {monster.alignment}
          </p>
          {monster.img_main === null ? <ButtonTooltip /> : null}
        </div>
        {monster.desc === null || monster.desc === 'False' ? null : (
          <p className='monster-description'>{monster.desc}</p>
        )}
      </div>
      <table className='monster-armor'>
        <tbody>
          <tr className='trow'>
            <td>Armor Class:</td>
            <td>
              {monster.armor_class} {monster.armor_desc}
            </td>
          </tr>
          <tr className='trow'>
            <td>Hit Points:</td>
            <td>
              {monster.hit_points} {monster.hit_dice}{' '}
            </td>
          </tr>
          <tr className='trow'>
            <td>Speed:</td>
            <td>{renderMonsterSpeed(monster.speed)}</td>
          </tr>
        </tbody>
      </table>
      <table className='monster-attributes'>
        <tbody>
          <tr>
            <td>Strength</td>
            <td>Dexterity</td>
            <td>Constitution</td>
            <td>Intelligence</td>
            <td>Wisdom</td>
            <td>Charisma</td>
          </tr>
          <tr>
            <td>{monster.strength}</td>
            <td>{monster.dexterity}</td>
            <td>{monster.constitution}</td>
            <td>{monster.intelligence}</td>
            <td>{monster.wisdom}</td>
            <td>{monster.charisma}</td>
          </tr>
        </tbody>
      </table>
      <section className='proficiencies-section'>
        <table className='monster-proficiencies'>
          <tbody>
            <tr className='trow'>
              <td>Savings Throw:</td>
              <td>{renderMonsterSavingsThrows()}</td>
            </tr>
            <tr className='trow'>
              <td>Skills:</td>
              <td>{renderMonsterSkills(monster.skills)}</td>
            </tr>
            <tr className='trow'>
              <td>Senses:</td>
              <td>{monster.senses}</td>
            </tr>
            <tr className='trow'>
              <td>Languages:</td>
              <td>{monster.languages}</td>
            </tr>
            <tr className='trow'>
              <td>Challenge Rating:</td>
              <td>{monster.cr}</td>
            </tr>
          </tbody>
        </table>
      </section>
      {monster.special_abilities !== null &&
      monster.special_abilities.length > 0 ? (
        <section className='monster-specials'>
          <h4 className='section-header'>Specials:</h4>
          {renderMonsterSpecials(monster.special_abilities)}
        </section>
      ) : null}
      {monster.actions !== null && monster.actions.length > 0 ? (
        <section className='monster-actions'>
          <h4 className='section-header'>Actions:</h4>
          {renderMonsterActions(monster.actions)}
        </section>
      ) : null}
      {monster.legendary_actions !== null &&
      monster.legendary_actions.length > 0 ? (
        <section className='monster-actions'>
          <h4 className='section-header'>Legendary Actions:</h4>
          {monster.legendary_desc !== null &&
          monster.legendary_desc.length > 0 ? (
            <p className='legendary-description'>{monster.legendary_desc}</p>
          ) : null}
          {renderMonsterLegendaryActions(monster.legendary_actions)}
        </section>
      ) : null}
    </div>
  );
};

export default CurrentMonsterView;
