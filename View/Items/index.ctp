<div class="items index">
	<div class="row">
		<div class="col-md-12">
			<div class="page-header">
					<ul class="nav nav-pills pull-right">
						<li><?php echo $this->Html->link('<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;' . __('New Item'), array('action' => 'add'), array('escape' => false)); ?></li>
					</ul>
					<h1><?php echo __('Items'); ?></h1>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-3">
			<?php echo $this->element('admin_navigation'); ?>
					</div><!-- end col md 3 -->

		<div class="col-md-9">
			<!-- List with handle -->
			<div id="listWithHandle" class="list-group">
				<?php foreach ($items as $item) {?>
					<div class="list-group-item" data-item-id="<?php echo h($item['Item']['id']); ?>">
						<span class="glyphicon glyphicon-move" aria-hidden="true"></span>
						<?php echo $this->Html->tag('input', null, array('type'=>'checkbox', 'checked'=>$item['Item']['done'])); ?>
						<?php echo $this->Html->link($item['Item']['desc'], '/items/edit/'.$item['Item']['id']); ?>
						<i class="js-remove">✖</i>
					</div>
				<?php } ?>
				<div class="list-group-item">
					<?php echo $this->Form->create('Item', array('role' => 'form', 'action'=>'add')); ?>

						<div class="form-group">
							<?php echo $this->Form->input('desc', array('label' => false, 'class' => 'form-control', 'placeholder' => __('Desc')));?>
						</div>
					<?php echo $this->Form->end() ?>
				</div>
			</div>
		</div> <!-- end col md 9 -->
	</div><!-- end row -->


</div>
