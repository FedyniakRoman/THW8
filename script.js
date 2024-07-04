// //Напишите функцию getTodos(username), которая в качестве аргумента принимает никнейм пользователя (api /users) и выводит список его задач (api /todos).
// В качестве ответа в консоль выведите массив с задачами указанного пользователя


async function getTodos(username) {
    try {
        let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersResponse.ok){
            throw new Error('Error!!!');
        }
        let users = await usersResponse.json()
        let user = users.find(user => user.username === username)
        let todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!todosResponse.ok){
            throw new Error('Error!!!');
        }
        let todos = await todosResponse.json()
        let userTodos = todos.filter(task => task.userId === user.id)
        console.log(userTodos);
    } catch (error){
        console.error('Error!')
    }
}
getTodos('Bret')
getTodos('Antonette')



// Напишите функцию getСomments(title), которая в качестве аргумента принимает заголовок поста (api /posts) и выводит список всех его комментариев (api /comments).
// В качестве ответа в консоль выведите массив с комментариями. Если у заданного поста комментариев нет, выведите в консоль соответствующее сообщение.


async function getComments(title) {
    try {
        let postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!postsResponse.ok) {
            throw new Error('Error fetching posts');
        }
        let posts = await postsResponse.json()
        let post = posts.find(post => post.title === title)
        if (!post) {
            throw new Error(`Post with title "${title}" not found`)
        }
        let commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments')
        if (!commentsResponse.ok) {
            throw new Error('Error fetching comments')
        }
        let comments = await commentsResponse.json();
        let postComments = comments.filter(comment => comment.postId === post.id)
        if (postComments.length === 0) {
            console.log(`NO COMMENTS for the post titled "${title}"`);
        } else {
            console.log(postComments)
        }
    } catch (error) {
        console.error('Error:', error.message)
    }
}
getComments('eum et est occaecati')



//Напишите функцию getPhotoByNickName(username), которая в качестве аргумента принимает никнейм пользователя (api /users) и выводит все его фотографии (api /photos). В качестве ответа выведите в консоль массив со всеми фотографиями указанного пользователя.

async function getPhotoByNickName(username) {
    try {
        let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersResponse.ok) {
            throw new Error('Error fetching users');
        }
        let users = await usersResponse.json();

        let user = users.find(user => user.username === username);
        if (!user) {
            throw new Error(`User with username "${username}" not found`);
        }


        let albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
        if (!albumsResponse.ok) {
            throw new Error('Error fetching albums');
        }
        let albums = await albumsResponse.json();

        let photoPromises = albums.map(album => 
            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching photos');
                    }
                    return response.json();
                })
        );

        let photos = await Promise.all(photoPromises);

        let allPhotos = photos.flat();

        if (allPhotos.length === 0) {
            console.log(`No photos found for the user "${username}"`);
        } else {
            console.log(allPhotos);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


getPhotoByNickName('Bret');


// another version
async function getTodos(username) {
    try {
      const userResp = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
      if (!userResp.ok) {
        throw new Error('Failed to get userData!');
      }
      const userData = await userResp.json();
      if (userData.length > 0) {
        let userId = userData[0].id;
        const todosResp = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        if (!todosResp.ok) {
          throw new Error('Failed to get user todos!');
        }
        const todosData = await todosResp.json();
        console.log(todosData);
      }
    }
    catch(err) {
      console.log('Error', err.message);
    }
  }
  
  getTodos('Antonette');