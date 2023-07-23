import { describe, expect, it } from 'vitest'

import { mount, RouterLinkStub } from '@vue/test-utils'
import TopNavbar from '../TopNavbar.vue'

describe('Navbar', () => {
  it('link selected should be a different color', () => {
    const wrapper = mount(TopNavbar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const links = wrapper.findAll('a')
    links[0].trigger('click')
    
    expect(links[0].classes('router-link-exact-active')).toBe(true)
    expect(links[1].classes()).not.toContain('router-link-exact-active')
    
    links[1].trigger('click')

    expect(links[0].classes()).not.toContain('router-link-exact-active')
    expect(links[1].classes()).toContain('router-link-exact-active')
  })
})
