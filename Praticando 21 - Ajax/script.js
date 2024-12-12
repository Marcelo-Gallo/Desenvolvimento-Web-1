$(document).ready(function() {
    function loadUsers() {
        $.ajax({
            url: 'https://epansani.com.br/2024/dwe1/ajax/list.php',
            type: 'GET',
            success: function(data) {
                const users = JSON.parse(data);
                let userTable = '';
                users.forEach(user => {
                    userTable += `
                        <tr>
                            <td>${user.nome}</td>
                            <td>${user.email}</td>
                            <td><button class="btn btn-danger delete-btn" data-id="${user.id}">Apagar</button></td>
                        </tr>
                    `;
                });
                $('#userTable').html(userTable);
            }
        });
    }

    $(document).on('click', '#submit', function() {
        const nome = $('#nome').val();
        const email = $('#email').val();

        $.ajax({
            url: 'https://epansani.com.br/2024/dwe1/ajax/ins.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nome, email }),
            success: function(response) {
                const res = JSON.parse(response);
                if (res.status === 'true') {
                    alert('Usuário inserido com sucesso');
                    loadUsers();
                } else {
                    alert('Erro ao inserir usuário');
                }
            }
        });
    });

    $(document).on('click', '.delete-btn', function() {
        const id = $(this).data('id');

        $.ajax({
            url: 'https://epansani.com.br/2024/dwe1/ajax/rem.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id }),
            success: function(response) {
                if (response === 'true') {
                    alert('Usuário removido com sucesso');
                    loadUsers();
                } else {
                    alert('Erro ao remover usuário');
                }
            }
        });
    });

    loadUsers();
});
