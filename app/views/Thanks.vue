<template>
  <Page :actionBarHidden="true" class="page">
    <GridLayout rows="5*, *" columns="*">
      <Image
        src="~/assets/images/first_page_logo.png"
        :width="130"
        :height="300"
        horizontalAlignment="center"
        verticalAlignment="center"
        row="0"
        column="0"
      />
      <Label
        text="Thank you for choosing us."
        textWrap="true"
        row="1"
        column="0"
        horizontalAlignment="center"
        verticalAlignment="center"
      />
    </GridLayout>
  </Page>
</template>

<script>
export default {};
</script>

