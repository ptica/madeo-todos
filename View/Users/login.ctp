<style>
.users.login label {
  width: 80px;
  float: left;
}

</style>

<div class="col-md-12">
	<div class="col-md-8 pull-right" style="margin-top:120px; text-align: right;">
		<?php echo $this->Html->image('madeo-webdesign', array("style"=>"width:630px")); ?>
	</div>
	<div class="page-header">
		<h1>Přihlášení</h1>
	</div>

	<div class="users login form col-md-4">
		<?php echo $this->Form->create('User'); ?>
			<fieldset>
				<p>
					Zadejte prosím vaše přístupové údaje</a>
				</p>
				<?php
					echo $this->Form->input('username', array('label'=>__('Jméno')));
					echo $this->Form->input('password', array('label'=>__('Heslo')));
					echo $this->Form->submit(__('Odeslat'), array('class'=>'btn btn-lg btn-primary', 'style'=>'margin-top:15px; width: 100%'));
				?>
			</fieldset>
		<?php echo $this->Form->end() ?>
	</div>
</div>
