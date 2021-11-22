import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="icons">
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          <FontAwesomeIcon icon={["fab", "instagram"]} />
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </div>
      </footer>
    </>
  );
}
