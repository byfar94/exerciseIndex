export default function CardLoading() {
  const numberOfRenderedLoadingCards = 3;
  let LoadingCardArray = [];

  for (let i = 0; i < numberOfRenderedLoadingCards; i++) {
    LoadingCardArray.push(
      <div key={`${i}loadingCard`} className='card-loading'></div>,
    );
  }

  return <>{LoadingCardArray}</>;
}
