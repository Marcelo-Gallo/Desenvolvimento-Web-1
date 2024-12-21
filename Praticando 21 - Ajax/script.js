$(document).ready(function () {
    //console.log('jQuery está funcionando!');
    //carregar tabela
    function recarregarTabela() {
        $.ajax({
            url: 'https://epansani.com.br/2024/dwe1/ajax/list.php',
            method: 'GET',
            dataType: 'json',
        }).done(function (resultado) {
            //console.log(resultado);
            let rows = '';
            resultado.forEach(function (item) {
                rows += `<tr>
                        <td>${item.nome}</td>
                        <td>${item.email}</td>
                        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Apagar</button></td>
                     </tr>`;
            });
            $('#dataTable tbody').html(rows);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Erro na requisição AJAX:', textStatus, errorThrown);
        });
    }

    recarregarTabela();

    //inserir registro
    $('#formulario').submit(function (e) {
        e.preventDefault();

        var nome = $('#nome').val();
        var email = $('#email').val();
        //console.log(nome, email);

        $.ajax({
            url: 'https://epansani.com.br/2024/dwe1/ajax/ins.php',
            method: 'POST',
            data: { nome: nome, email: email },
            dataType: 'json',
        }).done(function (resultado) {
            console.log(resultado);
            if (resultado) {
                console.log('Registro inserido com sucesso!');
                $('#successMessage').show();
                setTimeout(function () {
                    $('#successMessage').hide();
                }, 3000);
            }
            recarregarTabela();

        });

    });

    //deletar registro
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        if (confirm('Tem certeza que deseja deletar este registro?')) {
            $.ajax({
                url: 'https://epansani.com.br/2024/dwe1/ajax/rem.php',
                method: 'POST',
                data: { id: id },
                dataType: 'json',
            }).done(function (response) {
                if (response) {
                    console.log('Registro deletado com sucesso!');
                    recarregarTabela();
                } else {
                    alert('Erro ao deletar o registro!');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Erro na requisição AJAX:', textStatus, errorThrown);
            });
        } else {
            console.log('Delete cancelado!');
        }

    });

    $('#clearForm').click(function () {
        $('#formulario')[0].reset();
        //console.log('Formulário limpo!');
    });

    $('#refreshTable').click(function () {
        recarregarTabela();
        //console.log('Tabela recarregada!');
    });

});