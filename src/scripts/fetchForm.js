const form = document.getElementById('form');
const loader = form.querySelector('#loader');

export const fetchForm = async (data) => {
  const url = 'http://localhost:9090/api/registration';
  loader.classList.add('loader_active');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      loader.classList.remove('loader_active');
      throw new Error('Произошла ошибка повторите попытку');
    }

    const responseData = await response.json();
    loader.classList.remove('loader_active');
    console.log(responseData.msg);

    return responseData.msg || null;
  } catch (error) {
    loader.classList.remove('loader_active');
    console.error('Произошла ошибка:', error);
    return null;
  }
};
