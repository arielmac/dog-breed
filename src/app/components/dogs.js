import DogImage from "./dogImage";

export default function Dogs({dogsList}) {
  return dogsList && dogsList.map((dog, index) => {
      return (
        <tr key={index}>
          <td className="dogs__col-name" data-column="name">
            <div className="dogs__image-box">
              {
                <DogImage
                  imageId={dog.reference_image_id}
                  dogName={dog?.name}
                />
              }
              <span className="dogs__name">{dog?.name}</span>
            </div>
          </td>
          <td data-column="lifespan">{dog?.life_span}</td>
          <td data-column="height">{dog?.height.imperial} inches</td>
          <td>{dog?.weight.imperial} inches</td>
          <td>{dog?.breed_group}</td>
          <td>{dog?.bred_for}</td>
          <td>{dog?.origin}</td>
          <td>{dog?.temperament}</td>
        </tr>
      );
  })
}