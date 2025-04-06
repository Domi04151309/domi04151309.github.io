module LiquifyFilter
  def liquify(input)
    Liquid::Template.parse(input).render(@context)
  end
end

Liquid::Template.register_filter(LiquifyFilter)
