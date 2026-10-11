const b=document.querySelector('.menu'),n=document.querySelector('#links');b.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false')}));document.querySelector('#ano').textContent=new Date().getFullYear();

// Formulário estático: não existe envio automático ou armazenamento de dados pessoais.
const form=document.getElementById('form-inscricao');
form?.addEventListener('submit',ev=>{
 ev.preventDefault();if(!form.reportValidity())return;
 const v=id=>document.getElementById(id).value.trim();
 const modalidades=[...form.querySelectorAll('input[name="modalidade"]:checked')].map(e=>e.value);
 if((v('tipo')==='Atleta'||v('tipo')==='Sócio e atleta') && !modalidades.length){alert('Seleciona pelo menos uma modalidade para inscrição de atleta.');return;}
 const linhas=['PEDIDO DE INSCRIÇÃO — UDT VALE DO CALVO','',`Nome: ${v('nome')}`,`Email: ${v('email')}`,`Telefone: ${v('telefone')||'Não indicado'}`,`Tipo: ${v('tipo')}`,`Modalidades: ${modalidades.join(', ')||'Não aplicável'}`,`Outras/observações: ${v('outra')||'Nenhuma'}`,`Faixa etária: ${v('idade')}`,'', 'Valores informativos: joia 5 €, quota anual 12 €, total inicial 17 €.','Pedido sujeito a confirmação pela associação. Sem pagamento online.'];
 const texto=linhas.join('\n'); const r=document.getElementById('resultado-inscricao');r.hidden=false;r.replaceChildren();
 const p=document.createElement('p');p.textContent='O pedido está preparado. Clica em «Abrir email para enviar» e confirma o envio no teu programa de correio. A inscrição só fica válida após confirmação da UDT.';r.append(p);
 const ta=document.createElement('textarea');ta.readOnly=true;ta.value=texto;ta.setAttribute('aria-label','Texto do pedido de inscrição');r.append(ta);
 const emailLink=document.createElement('a');emailLink.className='btn primary send-mail';emailLink.textContent='Abrir email para enviar →';emailLink.href='mailto:u.d.templarios@gmail.com?subject='+encodeURIComponent('Pedido de inscrição — UDT Vale do Calvo')+'&body='+encodeURIComponent(texto);r.append(emailLink);
 const copy=document.createElement('button');copy.type='button';copy.textContent='Copiar pedido';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(texto);copy.textContent='Copiado!';}catch{ta.select();document.execCommand('copy');copy.textContent='Texto selecionado — copia manualmente';}});r.append(copy);
 const download=document.createElement('button');download.type='button';download.textContent='Guardar pedido (.txt)';download.addEventListener('click',()=>{const blob=new Blob([texto],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='pedido_inscricao_UDT.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});r.append(download);
 r.scrollIntoView({behavior:'smooth',block:'center'});
});
