export async function myFetch(content) {
  let response = await fetch(`https://demo1511398.mockable.io/${content}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    let data = await response.json();

    return data;
  }
}

myFetch().catch((e) => {
  console.log("Hubo un problema con la llamada: " + e.message);
});
