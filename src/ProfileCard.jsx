function ProfileCard(props) {
  return (
    <div className="profile-card">
      <h2>{props.name}</h2>
      <p>{props.title}</p>
      <p>{props.bio}</p>
    </div>
  );
}

export default ProfileCard;