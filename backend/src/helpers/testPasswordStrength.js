export default function testPasswordStrength(password) {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
  );
  const mediumRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  if (strongRegex.test(password)) {
    return 'high';
  } else if (mediumRegex.test(password)) {
    return 'med';
  } else {
    return 'low';
  }
}
