try {
  require.resolve('sharp');
  console.log('sharp yes');
} catch (e) {
  console.log('sharp no');
}
