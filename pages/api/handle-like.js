import { sanityClient } from "../../lib/sanity";

sanityClient.config({
  token:
    "skdhgoDyemp5ra2xyYBNhOucKFzldA7ZnGHrXJwV4L7tbyDMTkCO2rIjarqTAdZlJUlXAghx4hJ5XBxPnQOYTbsK86XPQuOLy43B3W4qogYPgbxjhW5JhsTQmqK5X6GR5T4PiRCdvDrAUGKhMjlCPK6KAYiWEJlA9uNx3oRoIakqHhkatGK6",
});

export default async function likeButtonHandler(req, res) {
  const { _id } = JSON.parse(req.body);
  const data = await sanityClient
    .patch(_id)
    .setIfMissing({ likes: 0 })
    .inc({ likes: 1 })
    .commit()
    .catch((error) => console.log(error));

  res.status(200).json({ likes: data.likes });
}
