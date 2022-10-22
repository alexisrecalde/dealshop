import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password, setPasswordSafety }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  setPasswordSafety(testResult.score);

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return 'Muy debil';
      case 1:
        return 'Debil';
      case 2:
        return 'Bien';
      case 3:
        return 'Muy bien';
      case 4:
        return 'Excelente!';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px',
  });

  // const getResult = () => ({
  //   return testResult.score
  // })

  return (
    <>
      <div className="progress" style={{ height: '7px', backgroundColor: '#828282' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor(), display: 'flex', justifyContent: 'flex-end' }}>{createPassLabel()}</p>
    </>
  );
};

export default PasswordStrengthMeter;
