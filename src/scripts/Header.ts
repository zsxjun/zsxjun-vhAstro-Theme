const linkListArr = ['links', 'friends', 'talking', 'archives', 'message', 'about']
export default () => {
  const linkARR = document.querySelectorAll('.vh-link-list>a');
  if (!linkARR.length) return;
  linkARR.forEach((i: any) => {
    i.classList.remove('active');
    const linkName = (window.location.pathname).split('/')[1]
    if (!linkListArr.includes(linkName)) return;
    document.querySelectorAll(`.${linkName}`).forEach((i: any) => i.classList.add('active'));
  })
}