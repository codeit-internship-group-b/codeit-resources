import { API_ENDPOINTS } from "@repo/constants";

export default function Home(): JSX.Element {
  return (
    <details>
      <summary>api 주소</summary>
      <p>{JSON.stringify(API_ENDPOINTS, null, 2)}</p>
      <p>{API_ENDPOINTS.USERS.GET_USER(1)}</p>
    </details>
  );
}
